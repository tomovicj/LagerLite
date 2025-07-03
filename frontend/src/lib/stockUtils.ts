import type { Stock } from "@/types/stock";

export type CombinedStock = Stock & {
  type: "IN" | "OUT";
};

export function combinedStock(
  stockIn: Stock[],
  stockOut: Stock[]
): CombinedStock[] {
  const inList = stockIn.map((item) => ({
    ...item,
    type: "IN" as const,
  }));

  const outList = stockOut.map((item) => ({
    ...item,
    type: "OUT" as const,
  }));

  return [...inList, ...outList];
}

export function sortStockByDate(stock: Stock[]): Stock[] {
  return stock.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
