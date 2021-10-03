import React, { useState } from "react";
import { getDaysData } from "./util/dataForCharts";
import { DailyData } from "./types";
import { Line } from "@nivo/line";

const commonProperties = {
  width: 900,
  height: 400,
  margin: { top: 20, right: 20, bottom: 60, left: 80 },
  animate: true,
  enableSlices: "x",
};

export default function BarChart() {
  const data: DailyData[] = getDaysData();
  console.log(data);
  return (
    <Line
      {...commonProperties}
      data={[
        {
          id: "daily",
          data,
        },
      ]}
      xScale={{
        type: "time",
        format: "%Y-%m-%d",
        useUTC: false,
        precision: "day",
      }}
      xFormat="time:%Y-%m-%d"
      yScale={{
        type: "linear",
        stacked: true,
        min: 0,
      }}
      axisLeft={{
        legend: "",
        legendOffset: 12,
      }}
      axisBottom={{
        format: "%b %d",
        tickValues: "every 1 day",
        legend: "",
        legendOffset: -12,
      }}
      enablePointLabel={true}
      pointSize={16}
      pointBorderWidth={1}
      pointBorderColor={{
        from: "color",
        modifiers: [["darker", 0.3]],
      }}
      useMesh={true}
      enableSlices={false}
    />
  );
}
