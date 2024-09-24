import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type GenderDistributionData = {
  gender: string
  count: number
}

export function GenderDistributionChart({ data }: { data: GenderDistributionData[] }) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Gender Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="gender" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="count" stroke="hsl(var(--chart-3))" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}