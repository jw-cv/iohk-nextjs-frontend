"use client"

import { TrendingUp, AlertCircle } from "lucide-react"
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

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

  const chartData = [
    {
      male: data.find(item => item.gender.toLowerCase() === 'male')?.count || 0,
      female: data.find(item => item.gender.toLowerCase() === 'female')?.count || 0,
    }
  ]

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="pb-0">
        <CardTitle className="text-left">Users by Gender</CardTitle>
        <CardDescription className="text-left">Distribution of users by gender</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <div className="w-full h-full" style={{ minHeight: "300px" }}>
          {hasData ? (
            <ChartContainer
              config={chartConfig}
              className="mx-auto aspect-square w-full max-w-[250px]"
            >
              <RadialBarChart
                data={chartData}
                startAngle={180}
                endAngle={0}
                innerRadius={80}
                outerRadius={130}
              >
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent hideLabel />}
                />
                <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                  <Label
                    content={({ viewBox }) => {
                      if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        return (
                          <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) - 16}
                              className="fill-foreground text-2xl font-bold"
                            >
                              {totalUsers.toLocaleString()}
                            </tspan>
                            <tspan
                              x={viewBox.cx}
                              y={(viewBox.cy || 0) + 4}
                              className="fill-muted-foreground"
                            >
                              Users
                            </tspan>
                          </text>
                        )
                      }
                    }}
                  />
                </PolarRadiusAxis>
                <RadialBar
                  dataKey="male"
                  stackId="a"
                  cornerRadius={5}
                  fill="var(--color-male)"
                  className="stroke-transparent stroke-2"
                />
                <RadialBar
                  dataKey="female"
                  stackId="a"
                  cornerRadius={5}
                  fill="var(--color-female)"
                  className="stroke-transparent stroke-2"
                />
              </RadialBarChart>
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
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {hasData ? (
          <>
            <div className="flex items-center gap-2 font-medium leading-none">
              Male: {((chartData[0].male / totalUsers) * 100).toFixed(1)}%, Female: {((chartData[0].female / totalUsers) * 100).toFixed(1)}% <TrendingUp className="h-4 w-4" />
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