"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type AgeGroupData = {
  ageGroup: string
  count: number
}

const chartConfig: ChartConfig = {
  ageGroup: {
    label: "Age Group",
    color: "hsl(var(--chart-1))",
  },
}

export function AgeGroupDistributionChart({ data }: { data: AgeGroupData[] }) {
  return (
    <Card>
      <CardHeader className="items-center">
        <CardTitle>Age Group Distribution</CardTitle>
        <CardDescription>
          Distribution of users across age groups
        </CardDescription>
      </CardHeader>
      <CardContent className="pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadarChart data={data}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="ageGroup" />
            <PolarGrid />
            <Radar
              dataKey="count"
              fill="var(--color-ageGroup)"
              fillOpacity={0.6}
              dot={{
                r: 4,
                fillOpacity: 1,
              }}
            />
          </RadarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Most users are in the {data.reduce((a, b) => a.count > b.count ? a : b).ageGroup} age group <TrendingUp className="h-4 w-4" />
        </div>
        <div className="flex items-center gap-2 leading-none text-muted-foreground">
          Based on current user data
        </div>
      </CardFooter>
    </Card>
  )
}