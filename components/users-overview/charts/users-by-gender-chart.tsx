"use client"

import { TrendingUp, AlertCircle } from "lucide-react"
import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
} from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ChartConfig, ChartContainer } from "@/components/ui/chart"

type UsersByGenderData = {
  gender: string
  count: number
}

const chartConfig: ChartConfig = {
  male: {
    label: "Male",
    color: "hsl(var(--chart-2))",
  },
  female: {
    label: "Female",
    color: "hsl(var(--chart-1))",
  },
}

export function UsersByGenderChart({ data }: { data: UsersByGenderData[] }) {
  const hasData = data.length > 0
  const totalUsers = data.reduce((sum, item) => sum + item.count, 0)
  const maleCount = data.find(item => item.gender.toLowerCase() === 'male')?.count || 0
  const femaleCount = data.find(item => item.gender.toLowerCase() === 'female')?.count || 0

  const chartData = [
    { gender: "Male", count: maleCount, fill: "var(--color-male)" },
    { gender: "Female", count: femaleCount, fill: "var(--color-female)" },
  ]

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="flex-none">
        <CardTitle className="text-left">Users by Gender</CardTitle>
        <CardDescription className="text-left">Distribution of users by gender</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex items-center justify-center p-2 sm:p-6">
        <div className="w-full h-full" style={{ minHeight: "300px" }}>
          {hasData ? (
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square w-full max-w-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  data={chartData}
                  startAngle={0}
                  endAngle={360}
                  innerRadius={80}
                  outerRadius={140}
                >
                  <PolarGrid
                    gridType="circle"
                    radialLines={false}
                    stroke="none"
                    className="first:fill-muted last:fill-background"
                    polarRadius={[86, 74]}
                  />
                  <RadialBar
                    dataKey="count"
                    background
                    cornerRadius={10}
                  />
                  <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                    <Label
                      content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                          return (
                            <text
                              x={viewBox.cx}
                              y={viewBox.cy}
                              textAnchor="middle"
                              dominantBaseline="middle"
                            >
                              <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-foreground text-4xl font-bold"
                              >
                                {totalUsers.toLocaleString()}
                              </tspan>
                              <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                              >
                                {totalUsers === 1 ? "User" : "Users"}
                              </tspan>
                            </text>
                          )
                        }
                      }}
                    />
                  </PolarRadiusAxis>
                </RadialBarChart>
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
              Male: {((maleCount / totalUsers) * 100).toFixed(1)}%, Female: {((femaleCount / totalUsers) * 100).toFixed(1)}% <TrendingUp className="h-4 w-4" />
            </div>
            <div className="leading-none text-muted-foreground">
              Showing distribution of users by gender
            </div>
          </>
        ) : (
          <div className="leading-none text-muted-foreground">
            No gender data available for the current filters
          </div>
        )}
      </CardFooter>
    </Card>
  )
}