import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function RemoveProductStockDialog(props: {
  open: boolean;
  setOpen: (open: boolean) => void;
  productId: number;
}) {
  return (
    <Dialog open={props.open} onOpenChange={props.setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Remove Stock</DialogTitle>
          <DialogDescription>
            Remove stock from the product with ID: {props.productId}. Please
            enter the quantity and any additional details required.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default RemoveProductStockDialog;
