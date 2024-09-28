"use client"

import { TrendingUp, AlertCircle } from "lucide-react"
import { CartesianGrid, Dot, Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

type DependantsByAgeData = {
  age: number;
  dependants: number;
}

const chartConfig: ChartConfig = {
  dependants: {
    label: "Dependants",
    color: "hsl(var(--chart-2))",
  },
}

const calculateAge = (birthDate: string): number => {
  const today = new Date()
  const birth = new Date(birthDate)
  let age = today.getFullYear() - birth.getFullYear()
  const monthDiff = today.getMonth() - birth.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--
  }
  return age
}

export function DependantsByAgeChart({ data }: { data: { birthDate: string; dependants: number }[] }) {
  const chartData: DependantsByAgeData[] = data.map(item => ({
    age: calculateAge(item.birthDate),
    dependants: item.dependants,
  })).sort((a, b) => a.age - b.age)

  const hasData = chartData.length > 0

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-left">Dependants by Age</CardTitle>
        <CardDescription className="text-left">Distribution of dependants across user ages</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-4">
        <div className="w-full h-full flex items-center justify-center" style={{ minHeight: "300px" }}>
          {hasData ? (
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{
                    top: 20,
                    right: 30,
                    bottom: 20,
                    left: 30,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis
                    dataKey="age"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    tick={{ fontSize: 12 }}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={
                      <ChartTooltipContent
                        indicator="line"
                        nameKey="dependants"
                        hideLabel
                      />
                    }
                  />
                  <Line
                    type="monotone"
                    dataKey="dependants"
                    stroke="var(--color-dependants)"
                    strokeWidth={2}
                    dot={({ payload, ...props }) => (
                      <Dot
                        r={4}
                        cx={props.cx}
                        cy={props.cy}
                        fill={`hsl(var(--chart-${(payload.age % 5) + 1}))`}
                        stroke={`hsl(var(--chart-${(payload.age % 5) + 1}))`}
                      />
                    )}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <div className="text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">No data available for the selected filters</p>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm pt-2">
        {hasData ? (
          <>
            <div className="flex items-center gap-2 font-medium leading-none">
              Trending up by {((chartData[chartData.length - 1].dependants - chartData[0].dependants) / chartData[0].dependants * 100).toFixed(1)}% across age range <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing dependants distribution across user ages
            </div>
          </>
        ) : (
          <div className="leading-none text-muted-foreground">
            No dependant data available for the current filters
          </div>
        )}
      </CardFooter>
    </Card>
  )
}