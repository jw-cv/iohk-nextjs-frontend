"use client"

import { TrendingUp, AlertCircle } from "lucide-react"
import { PolarGrid, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts"

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
  users: {
    label: "Users",
  },
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

  const chartData = data.map(item => ({
    gender: item.gender.toLowerCase(),
    users: item.count,
    fill: chartConfig[item.gender.toLowerCase() as keyof typeof chartConfig]?.color,
  }))

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-left">Users by Gender</CardTitle>
        <CardDescription className="text-left">Distribution of users by gender</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow p-0">
        <div className="w-full h-full" style={{ minHeight: "300px" }}>
          {hasData ? (
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadialBarChart
                  data={chartData}
                  innerRadius="30%"
                  outerRadius="90%"
                  barSize={20}
                  startAngle={90}
                  endAngle={-270}
                >
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel nameKey="gender" />}
                  />
                  <PolarGrid gridType="circle" />
                  <RadialBar
                    dataKey="users"
                    cornerRadius={5}
                    label={{
                      position: 'insideStart',
                      fill: '#fff',
                      fontWeight: 'bold',
                    }}
                  />
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
      <CardFooter className="flex-col items-start gap-2 text-sm pt-2">
        {hasData ? (
          <>
            <div className="flex items-center gap-2 font-medium leading-none">
              {chartData.map((item, index) => (
                <span key={item.gender}>
                  {item.gender.charAt(0).toUpperCase() + item.gender.slice(1)}: {((item.users / totalUsers) * 100).toFixed(1)}%
                  {index < chartData.length - 1 && ", "}
                </span>
              ))}
              <TrendingUp className="h-4 w-4 ml-2" />
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