"use client"

import { TrendingUp, AlertCircle } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts"
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
  const sortedData = [...data].sort((a, b) => {
    const [aStart] = a.ageGroup.split('-').map(Number)
    const [bStart] = b.ageGroup.split('-').map(Number)
    return aStart - bStart
  })

  const hasData = sortedData.length > 0

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-left">Age Group Distribution</CardTitle>
        <CardDescription className="text-left">
          Distribution of users across age groups (5-year increments)
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="w-full h-full min-h-[300px]">
          {hasData ? (
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={sortedData}>
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
      <CardFooter className="flex-col items-start gap-2 text-sm">
        {hasData ? (
          <>
            <div className="flex items-center gap-2 font-medium leading-none">
              Most users are in the {sortedData.reduce((a, b) => a.count > b.count ? a : b).ageGroup} age group <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Based on current user data with 5-year age group increments
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2 leading-none text-muted-foreground">
            No age group data available for the current filters
          </div>
        )}
      </CardFooter>
    </Card>
  )
}