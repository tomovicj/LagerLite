import ProductStockBreadcrumb from "@/components/ProductStockBreadcrumb";
import StockTable from "@/components/StockTable";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  combinedStock,
  sortStockByDate,
  type CombinedStock,
} from "@/lib/stockUtils";
import type { Product } from "@/types/product";
import type { Stock } from "@/types/stock";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useParams } from "@tanstack/react-router";
import axios from "axios";

export const Route = createFileRoute("/product/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = useParams({ from: "/product/$id" });

  const { data: product, status } = useQuery({
    queryKey: ["product", id],
    queryFn: () =>
      axios
        .get<Product>(`http://localhost:8080/api/product/${id}`)
        .then((res) => res.data),
  });

  const { data: stockIn, status: stockInStatus } = useQuery({
    queryKey: ["product-stock-in", id],
    queryFn: () =>
      axios
        .get<Stock[]>(`http://localhost:8080/api/stock-in`, {
          params: { productId: id },
        })
        .then((res) => res.data),
  });
  const { data: stockOut, status: stockOutStatus } = useQuery({
    queryKey: ["product-stock-out", id],
    queryFn: () =>
      axios
        .get<Stock[]>(`http://localhost:8080/api/stock-out`, {
          params: { productId: id },
        })
        .then((res) => res.data),
  });

  if (
    status === "pending" ||
    stockInStatus === "pending" ||
    stockOutStatus === "pending"
  ) {
    return <div>Loading...</div>;
  }

  if (
    status === "error" ||
    stockInStatus === "error" ||
    stockOutStatus === "error"
  ) {
    return <div>Error loading product or stock data.</div>;
  }

  const combined = combinedStock(stockIn, stockOut);
  const sortedCombined = sortStockByDate(combined) as CombinedStock[];

  return (
    <Card className="w-3xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Stock</CardTitle>
        <ProductStockBreadcrumb
          productName={product?.name || "Loading..."}
          className="mt-4"
        />
      </CardHeader>
      <CardContent>
        <StockTable stock={sortedCombined} />
      </CardContent>
    </Card>
  );
}
