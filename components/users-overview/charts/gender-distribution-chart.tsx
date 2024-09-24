"use client"

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"

type GenderDistributionData = {
  gender: string
  count: number
}

export function GenderDistributionChart({ data }: { data: GenderDistributionData[] }) {
  const hasData = data.length > 0
  const totalUsers = hasData ? data.reduce((sum, item) => sum + item.count, 0) : 0
  const mostCommonGender = hasData ? data.reduce((a, b) => a.count > b.count ? a : b).gender : null

  return (
    <Card className="w-full h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-left">Gender Distribution</CardTitle>
        <CardDescription className="text-left">Distribution of users by gender</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="w-full h-full min-h-[300px]">
          {hasData ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="gender" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="count" stroke="hsl(var(--chart-3))" />
              </LineChart>
            </ResponsiveContainer>
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
        {hasData && mostCommonGender ? (
          <>
            <div className="flex items-center gap-2 font-medium leading-none">
              {mostCommonGender} is the most common gender
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
              Based on {totalUsers} total users
            </div>
          </>
        ) : (
          <div className="flex items-center gap-2 leading-none text-muted-foreground">
            No gender data available for the current filters
          </div>
        )}
      </CardFooter>
    </Card>
  )
}