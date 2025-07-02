import React from "react";
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
  return (
    <TableRow>
      <TableCell>{product.id}</TableCell>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.description}</TableCell>
      <TableCell>{product.code}</TableCell>
      <TableCell>
        <Skeleton className="h-[20px] w-[60px] rounded-full" />
      </TableCell>
    </TableRow>
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
