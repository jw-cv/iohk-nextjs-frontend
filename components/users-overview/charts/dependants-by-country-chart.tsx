"use client"

import { TrendingUp, AlertCircle } from "lucide-react"
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts"

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

type DependantsByCountryData = {
  country: string
  dependants: number
}

const chartConfig: ChartConfig = {
  dependants: {
    label: "Dependants",
  },
  Latvia: {
    label: "Latvia",
    color: "hsl(var(--chart-1))",
  },
  Spain: {
    label: "Spain",
    color: "hsl(var(--chart-2))",
  },
  German: {
    label: "German",
    color: "hsl(var(--chart-3))",
  },
  China: {
    label: "China",
    color: "hsl(var(--chart-4))",
  },
}

export function DependantsByCountryChart({ data }: { data: DependantsByCountryData[] }) {
  const chartData = data.map((item, index) => ({
    ...item,
    fill: `hsl(var(--chart-${(index % 5) + 1}))`,
  }))

  const hasData = chartData.length > 0
  const maxDependants = hasData ? Math.max(...data.map(item => item.dependants)) : 0
  const countryWithMostDependants = hasData ? data.find(item => item.dependants === maxDependants) : null

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle>Dependants by Country</CardTitle>
        <CardDescription>Distribution of dependants across countries</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {hasData ? (
          <ChartContainer config={chartConfig}>
            <BarChart data={chartData}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="country"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) =>
                  chartConfig[value as keyof typeof chartConfig]?.label || value
                }
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar
                dataKey="dependants"
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
          </ChartContainer>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
              <p className="mt-2 text-sm text-muted-foreground">No data available for the selected filters</p>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {hasData && countryWithMostDependants ? (
          <>
            <div className="flex gap-2 font-medium leading-none">
              {countryWithMostDependants.country} has the highest number of dependants ({countryWithMostDependants.dependants}) <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing total dependants for each country
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