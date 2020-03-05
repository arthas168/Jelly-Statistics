import React, { useContext } from "react";
import ProviderInfoContext from "../../context/providerInfo/context";
import { safeAccess } from "../../utils";
import getSumOfBalances from "./getSumOfBalances";
import Chart from "../../utils/chart";
import "./style.scss";

export default () => {
  const providerInfoContext = useContext(ProviderInfoContext);
  const { providerInfo } = providerInfoContext;

  const prices = safeAccess(providerInfo[0], ["prices"]);
  const balances = safeAccess(providerInfo[0], ["balances"]);
  const sumOfBalances = getSumOfBalances(balances, prices);
  let labels = [];
  let shortBalances = [];

  if (balances) {
    labels = Object.keys(balances);
    Object.entries(balances).forEach(entry => {
      const network = entry[0];
      const balanceShort = parseFloat(entry[1].balanceShort);
      const priceToUSDT = safeAccess(prices, [network, "USDT"]);
      const balanceShortUSDT = parseFloat(balanceShort * priceToUSDT);

      shortBalances.push(balanceShortUSDT.toFixed(3));
    });
  }

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Liquidity",
        data: shortBalances,
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
    <div className="liquidity">
      <span>{sumOfBalances}</span>
      <Chart chartData={chartData} />
    </div>
  );
};
