import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { useGetStatsQuery } from "state/api";

const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();
  const { data, isLoading } = useGetStatsQuery();
  const [totalWaterLine, totaltreeLine] = useMemo(() => {
    if (!data) return [];

      const { monthlyData } = data;
    const totalWaterLine = {
      id: "Tổng lượng nước",
      color: theme.palette.secondary.main,
      data: [],
    };
    const totaltreeLine = {
      id: "Tổng số lần",
      color: theme.palette.secondary[600],
      data: [],
    };
    Object.values(monthlyData).reduce(
      (acc, { month, totalwater, totaltree }) => {
        const curwater =  totalwater;
        const curUnits = totaltree;

        totalWaterLine.data = [
          ...totalWaterLine.data,
          { x: month, y: curwater },
        ];
        totaltreeLine.data = [
          ...totaltreeLine.data,
          { x: month, y: curUnits },
        ];

        return { water: curwater, units: curUnits };
      },
      { water: monthlyData[0].totalwater, units: monthlyData[0].totaltree   }
    );

    return [[totalWaterLine], [totaltreeLine]];
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!data || isLoading) return "Loading...";

  return (
    <ResponsiveLine
      data={view === "water" ? totalWaterLine : totaltreeLine}
      theme={{
        axis: {
          domain: {
            line: {
                  stroke: theme.palette.secondary[200],
                  fontSize: 15,
            },
          },
          legend: {
            text: {
                  fill: theme.palette.secondary[200],
                  fontSize: 20,
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
                fill: theme.palette.secondary[200],
                fontSize: 15,
            },
          },
        },
        legends: {
          text: {
                fill: theme.palette.secondary[200],
                fontSize: 20,
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 20, right: 90, bottom: 50, left: 110 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (isDashboard) return v.slice(0, 3);
          return v;
        },
        orient: "bottom",
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
      }}
      axisLeft={{
        orient: "left",
        tickValues: 5,
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? ""
          : `Tổng ${view === "water" ? "lượng nước tưới theo tháng (mm3)" : "số lần cây được tưới theo tháng (lần)"} `,
        legendOffset: -90,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: -30,
                translateY: -600,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  );
};

export default OverviewChart;