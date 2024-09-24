"use client"

import { TrendingUp, AlertCircle } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis, ResponsiveContainer } from "recharts"

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

type AgeByCountryData = {
  country: string
  averageAge: number
}

const chartConfig: ChartConfig = {
  averageAge: {
    label: "Average Age",
    color: "hsl(var(--chart-1))",
  },
}

export function AverageAgeByCountryChart({ data }: { data: AgeByCountryData[] }) {
  const hasData = data.length > 0

  const sortedData = [...data].sort((a, b) => b.averageAge - a.averageAge)

  const chartData = sortedData.map((item, index) => ({
    ...item,
    fill: `hsl(var(--chart-${(index % 5) + 1}))`,
  }))

  const overallAverageAge = hasData
    ? data.reduce((sum, country) => sum + country.averageAge, 0) / data.length
    : 0

  return (
    <Card className="w-full h-full flex flex-col md:col-span-1">
      <CardHeader className="flex-none">
        <CardTitle className="text-left">Average Age by Country</CardTitle>
        <CardDescription className="text-left">Demographic comparison of mean ages across nations</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center p-2 sm:p-6">
        <div className="w-full h-full" style={{ minHeight: "300px" }}>
          {hasData ? (
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData}
                  margin={{
                    top: 5,
                    right: 5,
                    left: 5,
                    bottom: 30,
                  }}
                >
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="country"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={10}
                    interval={0}
                    tick={({ x, y, payload }) => (
                      <text x={x} y={y} dy={16} textAnchor="middle" fill="#888" fontSize={12}>
                        {payload.value.length > 6 ? `${payload.value.slice(0, 6)}...` : payload.value}
                      </text>
                    )}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel />}
                  />
                  <Bar
                    dataKey="averageAge"
                    strokeWidth={2}
                    radius={8}
                    activeBar={({ ...props }) => {
                      return (
                        <Rectangle
                          {...props}
                          fillOpacity={0.8}
                          stroke={props.fill}
                          strokeDasharray={4}
                          strokeDashoffset={4}
                        />
                      )
                    }}
                  />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-center">
                <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                <p className="mt-2 text-sm text-muted-foreground">No data available for the selected filters</p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex-none flex-col items-start gap-2 text-sm">
        {hasData ? (
          <>
            <div className="flex items-center gap-2 font-medium leading-none">
              Average age across all countries: {overallAverageAge.toFixed(1)} years <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing average age across {data.length} countries
            </div>
          </>
        ) : (
          <div className="leading-none text-muted-foreground">
            No age data available for the current filters
          </div>
        )}
      </CardFooter>
    </Card>
  )
}