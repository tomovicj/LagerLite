import { createFileRoute } from "@tanstack/react-router";
import ProductTable from "@/components/ProductTable";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NewProductDialog from "@/components/NewProductDialog";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div>
      <Card className="w-full max-w-3xl mx-auto mt-10">
        <CardHeader>
          <CardTitle>Product List</CardTitle>
          <CardAction>
            <NewProductDialog />
          </CardAction>
        </CardHeader>
        <CardContent>
          <ProductTable />
        </CardContent>
      </Card>
    </div>
  );
}
