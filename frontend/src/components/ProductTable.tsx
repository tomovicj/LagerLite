import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Product } from "@/types/product";
import { Skeleton } from "./ui/skeleton";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import React from "react";
import { Button } from "./ui/button";
import {
  CircleMinus,
  CirclePlus,
  MoreHorizontal,
  Pencil,
  Trash2,
} from "lucide-react";
import EditProductDialog from "./EditProductDialog";
import DeleteProductDialog from "./DeleteProductDialog";
import AddProductStockDialog from "./AddProductStockDialog";
import RemoveProductStockDialog from "./RemoveProductStockDialog";

function ProductTable() {
  const {
    data: products,
    status,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: () =>
      axios
        .get<Product[]>("http://localhost:8080/api/product")
        .then((res) => res.data),
  });

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Code</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead className="w-9"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {status === "pending" && <ProductTableRowsSkeleton />}
        {status === "error" && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              Error: {error.message}
            </TableCell>
          </TableRow>
        )}
        {status === "success" &&
          (products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center">
                No products found
              </TableCell>
            </TableRow>
          ) : (
            products.map((product) => (
              <ProductTableRow key={product.id} product={product} />
            ))
          ))}
      </TableBody>
    </Table>
  );
}

function ProductTableRow({ product }: { product: Product }) {
  const { data: stock, status } = useQuery({
    queryKey: ["product-stock", product.id],
    queryFn: () =>
      axios
        .get<number>(`http://localhost:8080/api/product/${product.id}/stock`)
        .then((res) => res.data),
  });

  return (
    <TableRow>
      <TableCell>{product.id}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell>{product.code}</TableCell>
      <TableCell>
        {status === "pending" ? (
          <Skeleton className="h-[20px] w-[60px] rounded-full" />
        ) : status === "error" ? (
          <span>N/A</span>
        ) : (
          stock
        )}
      </TableCell>
      <TableCell className="w-9 text-right">
        <ProductDropdownOptions id={product.id} />
      </TableCell>
    </TableRow>
  );
}

function ProductDropdownOptions(props: { id: number }) {
  const [openAddStockDialog, setOpenAddStockDialog] = React.useState(false);
  const [openRemoveStockDialog, setOpenRemoveStockDialog] =
    React.useState(false);
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = React.useState(false);

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon">
            <MoreHorizontal />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem onClick={() => setOpenAddStockDialog(true)}>
            <CirclePlus /> Add Stock
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenRemoveStockDialog(true)}>
            <CircleMinus /> Remove Stock
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenEditDialog(true)}>
            <Pencil /> Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onClick={() => setOpenDeleteDialog(true)}
          >
            <Trash2 /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <>
        <AddProductStockDialog
          open={openAddStockDialog}
          setOpen={setOpenAddStockDialog}
          productId={props.id}
        />
        <RemoveProductStockDialog
          open={openRemoveStockDialog}
          setOpen={setOpenRemoveStockDialog}
          productId={props.id}
        />
        <EditProductDialog
          open={openEditDialog}
          setOpen={setOpenEditDialog}
          productId={props.id}
        />
        <DeleteProductDialog
          open={openDeleteDialog}
          setOpen={setOpenDeleteDialog}
          productId={props.id}
        />
      </>
    </div>
  );
}

function ProductTableRowsSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="h-[20px] w-[40px] rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[20px] w-[100px] rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[20px] w-[150px] rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[20px] w-[80px] rounded-full" />
          </TableCell>
          <TableCell>
            <Skeleton className="h-[20px] w-[60px] rounded-full" />
          </TableCell>
        </TableRow>
      ))}
    </>
  );
}

export default ProductTable;
