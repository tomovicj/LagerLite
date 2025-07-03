import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import React from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Button } from "./ui/button";

function AddProductStockDialog(props: {
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

  const addStockRequest = () => {
    return axios.post("http://localhost:8080/api/stock-in", {
      product: { id: props.productId },
      quantity,
    });
  };
  const mutation = useMutation({
    mutationFn: addStockRequest,
    onSuccess: () => {
      props.setOpen(false);
      setQuantity(0);
      queryClient.invalidateQueries({
        queryKey: ["product-available-stock", props.productId],
      });
    },
  });

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Stock</DialogTitle>
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
        <DialogFooter>
          <Button
            disabled={status !== "success" || !product}
            onClick={() => mutation.mutate()}
          >
            Add Stock
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddProductStockDialog;
