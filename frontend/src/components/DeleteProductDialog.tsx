import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function DeleteProductDialog(props: {
  open: boolean;
  setOpen: (open: boolean) => void;
  productId: number;
}) {
  const queryClient = useQueryClient();
  const deleteProductRequest = () => {
    return axios.delete(`http://localhost:8080/api/product/${props.productId}`);
  };
  const mutation = useMutation({
    mutationFn: deleteProductRequest,
    onSuccess: () => {
      props.setOpen(false);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", props.productId] });
    },
    onError: (error) => {
      console.error("Error deleting product:", error);
    },
  });

  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this product? This action cannot be
            undone.
            <br />
            <br />
            Product ID: {props.productId}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => props.setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => mutation.mutate()}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteProductDialog;
