"use client";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { dateFormatter } from "../lib/date";

const chartConfig = {
  views: {
    label: "Page Views",
  },
  avg: {
    label: "Average",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

interface Props {
  data: { created_at: string; avg: number }[];
}

const xAxisTickFormatter = (value: string) => {
  return dateFormatter.format(new Date(value));
};

const AverageChart = ({ data }: Props) => {
  const total = data.reduce((acc, curr) => acc + curr.avg, 0);

  return (
    <Card className="py-4 sm:py-0">
      <CardHeader className="flex flex-col items-stretch border-b !p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0">
          <CardTitle>3 dart averages</CardTitle>
          <CardDescription>Over the last {data.length} games</CardDescription>
        </div>
        <div className="flex">
          <div className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l sm:border-t-0 sm:border-l sm:px-8 sm:py-6">
            <span className="text-muted-foreground text-xs">
              {chartConfig.avg.label}
            </span>
            <span className="text-lg leading-none font-bold sm:text-3xl">
              {total === 0 ? "0.00" : (total / data.length).toFixed(2)}
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="created_at"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={xAxisTickFormatter}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="avg"
                  labelFormatter={(value) => {
                    return dateFormatter.format(new Date(value));
                  }}
                />
              }
            />
            <Line
              dataKey="avg"
              type="monotone"
              stroke="var(--color-chart-1)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default AverageChart;
