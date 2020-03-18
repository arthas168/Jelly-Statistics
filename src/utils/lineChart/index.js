import React from "react";
import { Line } from "react-chartjs-2";

export default ({ chartData, titleText, tooltips }) => {
  return (
    <div className="chart">
      <Line
        data={chartData}
        options={{
          responsive: true,

          title: {
            display: true,
            text: titleText,
            fontColor: "#fcfcfc",
            fontSize: "18",
            padding: "15"
          },

          tooltips: {
            ...tooltips
          },

          legend: {
            display: false
          },

          scales: {
            xAxes: [
              {
                type: "time",
                time: {
                  unit: "day"
                },
                ticks: {
                  fontColor: "#fcfcfc"
                }
              }
            ],
            yAxes: [
              {
                ticks: {
                  fontColor: "#fcfcfc"
                }
              }
            ]
          }
        }}
      />
    </div>
  );
};
