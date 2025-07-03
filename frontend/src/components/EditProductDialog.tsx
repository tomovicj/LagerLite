import React from "react";
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
import { Textarea } from "./ui/textarea";
import axios from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Product } from "@/types/product";
import { Button } from "./ui/button";

function EditProductDialog(props: {
  open: boolean;
  setOpen: (open: boolean) => void;
  productId: number;
}) {
  const queryClient = useQueryClient();

  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [code, setCode] = React.useState("");

  const {
    data: product,
    status,
    isLoading,
  } = useQuery({
    queryKey: ["product", props.productId],
    queryFn: async () =>
      axios
        .get<Product>(`http://localhost:8080/api/product/${props.productId}`)
        .then((res) => res.data),
    enabled: props.open, // Only fetch when dialog is open
  });

  React.useEffect(() => {
    if (status === "success" && product) {
      setName(product.name);
      setDescription(product.description);
      setCode(product.code);
    }
  }, [status, product]);

  const updateProductRequest = () => {
    return axios.post(`http://localhost:8080/api/product/${props.productId}`, {
      name,
      description,
      code,
    });
  };
  const mutation = useMutation({
    mutationFn: updateProductRequest,
    onSuccess: () => {
      props.setOpen(false);
      setName("");
      setDescription("");
      setCode("");
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", props.productId] });
    },
    onError: (error) => {
      console.error("Error updating product:", error);
    },
  });

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
          <DialogDescription>Edit the product details below.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Label htmlFor="name">Name:</Label>
            <Input
              id="name"
              disabled={isLoading}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="description">Description:</Label>
            <Textarea
              id="description"
              disabled={isLoading}
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="grid gap-1">
            <Label htmlFor="code">Code:</Label>
            <Input
              id="code"
              disabled={isLoading}
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => mutation.mutate()}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditProductDialog;
