import { createFileRoute } from '@tanstack/react-router'
import ProductTable from '@/components/ProductTable'
import { Card, CardContent } from '@/components/ui/card'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div>
      <Card className="w-full max-w-3xl mx-auto mt-10">
        <CardContent>
          <ProductTable />
        </CardContent>
      </Card>
    </div>
  )
}
