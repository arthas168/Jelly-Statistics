import React, { useContext, useState, useEffect } from "react";
import ProviderInfoContext from "../../context/providerInfo/context";

import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { aggregateVolumeDates, safeAccess } from "../../utils";

import VolumeContext from "../../context/volumeContext/context";
import Chart from "../../utils/lineChart";

import "./style.scss";

export default () => {
  const providerInfoContext = useContext(ProviderInfoContext);
  const { providerInfo } = providerInfoContext;

  // Prices from Jelly provider
  const prices = safeAccess(providerInfo[0], ["prices"]);

  const volumeContext = useContext(VolumeContext);
  const { volume } = volumeContext;

  const [datesForChart, setDatesForChart] = useState([]);

  useEffect(() => {
    if (volume.length > 0) {
      setDatesForChart(
        aggregateVolumeDates(volume, safeAccess(prices, ["USDT"]))
      );
    }
  }, [volume, prices]);

  const chartData = {
    datasets: [
      {
        label: "Volume",
        data: datesForChart,
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
          "rgba(255, 99, 132, 0.6)"
        ]
      }
    ]
  };

  return (
    <div className="volume">
      {datesForChart.length > 0 ? (
        <Chart
          chartData={chartData}
          titleText="Total Volume (in USD) - For All Time"
        />
      ) : (
        <Loader
          className={"loader"}
          type="ThreeDots"
          color="#00BFFF"
          height={100}
          width={100}
        />
      )}
    </div>
  );
};
