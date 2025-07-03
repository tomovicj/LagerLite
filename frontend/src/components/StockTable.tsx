import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { CombinedStock } from "@/lib/stockUtils";

function StockTable(props: { stock: CombinedStock[] }) {
  return (
    <Table>
      <TableCaption>A list of all stock changes for this product</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Product Name</TableHead>
          <TableHead>Quantity</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {props.stock.map((stock) => (
          <StockTableRow key={stock.type + stock.id} stock={stock} />
        ))}
      </TableBody>
    </Table>
  );
}

function StockTableRow(props: { stock: CombinedStock }) {
  const { stock } = props;

  return (
    <TableRow>
      <TableCell>{stock.id}</TableCell>
      <TableCell>{stock.product.name}</TableCell>
      <TableCell>{stock.quantity}</TableCell>
      <TableCell>{stock.type}</TableCell>
      <TableCell>{new Date(stock.createdAt).toLocaleString()}</TableCell>
    </TableRow>
  );
}

export default StockTable;
