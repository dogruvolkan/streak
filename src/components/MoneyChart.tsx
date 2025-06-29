import * as React from "react";
import { Box, Typography } from "@mui/material";
import { PieChart } from "@mui/x-charts/PieChart";
import type { MoneyEntry } from "./MoneyTrackerBottomSheet";

interface MoneyChartProps {
  moneyList: MoneyEntry[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  t: any;
  currency: string;
}

const MoneyChart: React.FC<MoneyChartProps> = ({ moneyList, t }) => {
  const income = moneyList
    .filter((e) => e.type === "income")
    .reduce((sum, e) => sum + e.amount, 0);
  const expense = moneyList
    .filter((e) => e.type === "expense")
    .reduce((sum, e) => sum + e.amount, 0);

  if (income === 0 && expense === 0) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" mb={2}>
        {t.noMoneyEntries}
      </Typography>
    );
  }

  const data = [
    { id: 0, value: income, label: t.income },
    { id: 1, value: expense, label: t.expense },
  ];

  const chartProps = {
    height: 150,
    width: 150,
    innerRadius: 10,
    arcLabelMinAngle: 10,
    skipAnimation: true,
  };

  return (
    <Box display={"flex"} flexDirection="column" gap={2} mb={2}>
      <Box>
        <Typography variant="subtitle2" mb={1}>
          {t.totalIncomeVsExpense || "Gelir vs Gider"}
        </Typography>
        <PieChart
          {...chartProps}
          series={[
            {
              data,
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default MoneyChart;
