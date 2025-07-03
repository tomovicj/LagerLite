import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertCircleIcon } from "lucide-react";

function RemoveProductStockDialog(props: {
  open: boolean;
  setOpen: (open: boolean) => void;
  productId: number;
}) {
  const queryClient = useQueryClient();

  const [quantity, setQuantity] = React.useState<number>(0);

  const getProductRequest = async () => {
    return axios
      .get(`http://localhost:8080/api/product/${props.productId}`)
      .then((res) => res.data);
  };
  const { data: product, status } = useQuery({
    queryKey: ["product", props.productId],
    queryFn: getProductRequest,
    enabled: props.open, // Only fetch when dialog is open
  });

  const { data: availableStock } = useQuery({
    queryKey: ["product-available-stock", props.productId],
    queryFn: () =>
      axios
        .get<number>(
          `http://localhost:8080/api/product/${props.productId}/stock`
        )
        .then((res) => res.data),
    enabled: props.open, // Only fetch when dialog is open
  });

  const removeStockRequest = () => {
    return axios.post("http://localhost:8080/api/stock-out", {
      product: { id: props.productId },
      quantity,
    });
  };
  const mutation = useMutation({
    mutationFn: removeStockRequest,
    onSuccess: () => {
      props.setOpen(false);
      setQuantity(0);
      queryClient.invalidateQueries({
        queryKey: ["product-available-stock", props.productId],
      });
    },
  });
  const handleRemoveStock = () => {
    if (availableStock !== undefined && quantity > availableStock) {
      return;
    }
    mutation.mutate();
  };
  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Stock</DialogTitle>
          <DialogDescription>
            Please enter the quantity and any additional details required.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Label htmlFor="product-id">Product ID:</Label>
            <Input
              id="product-id"
              disabled
              value={status === "success" && product ? product.id : ""}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="product-name">Product Name:</Label>
            <Input
              id="product-name"
              disabled
              value={status === "success" && product ? product.name : ""}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="quantity">Quantity:</Label>
            <Input
              id="quantity"
              value={quantity}
              type="number"
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </div>
        </div>
        {status === "success" &&
          availableStock !== undefined &&
          availableStock < quantity && <StockAlert />}
        <DialogFooter>
          <Button
            disabled={
              status !== "success" ||
              !product ||
              quantity <= 0 ||
              availableStock === undefined ||
              quantity > availableStock
            }
            onClick={() => handleRemoveStock()}
          >
            Remove Stock
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function StockAlert() {
  return (
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>No enough stock</AlertTitle>
      <AlertDescription>
        The quantity you are trying to remove exceeds the available stock.
        Please check the current stock level and try again.
      </AlertDescription>
    </Alert>
  );
}
export default RemoveProductStockDialog;
