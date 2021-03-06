// @ts-nocheck
import React from "react";
import { getDaysData } from "./util/dataForCharts";
import { Line } from "@nivo/line";

const commonProperties = {
  width: 900,
  height: 400,
  margin: { top: 20, right: 20, bottom: 60, left: 80 },
  animate: true,
  enableSlices: "x",
};

export default function BarChart() {
  const data = getDaysData();
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
        max: "auto",
      }}
      axisLeft={{
        legend: "pomo",
        legendOffset: -40,
        legendPosition: "middle",
      }}
      axisBottom={{
        format: "%b %d",
        tickValues: "every 1 day",
        tickRotation: 30,
        legend: "day",
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
