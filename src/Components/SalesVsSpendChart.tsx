import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataEntry {
    Date: string;
    "Total Sales": string;
    "Total Investment": string;
}

interface MonthlyData {
    date: string;
    totalSales: number;
    totalSpend: number;
}

interface Props {
    data: DataEntry[];
}

const SalesVsSpendChart: React.FC<Props> = ({ data }) => {

    const formatCurrency = (value: number) => {
        const suffixes: string[] = ['', 'K', 'M'];
        const absValue: number = Math.abs(value);
        const suffixNum: number = Math.floor(Math.log10(absValue) / 3);
        const shortValue: number = absValue >= 1000 ? parseFloat((value / Math.pow(1000, suffixNum)).toFixed(2)) : value;
        return shortValue + suffixes[suffixNum];
    };
    
    const formatTooltip = (value: number | string) => `$${formatCurrency(typeof value === 'string' ? parseFloat(value) : value)}`;
    
    // Step 1: Aggregate data to calculate monthly sales and spend
    const monthlyData = data.reduce((acc, entry) => {
        const date = entry.Date;
        if (!date) {
            return acc; // Skip this entry if Date is undefined
        }
        const month = date.split('-')[1] + '-' +date.split('-')[2];

        if (!acc[month]) {
            acc[month] = { date: month, totalSales: parseFloat(entry["Total Sales"]), totalSpend: parseFloat(entry["Total Investment"]) };
        } else {
            acc[month].totalSales += parseFloat(entry["Total Sales"]);
            acc[month].totalSpend += parseFloat(entry["Total Investment"]);
        }
        
        return acc;
    }, {} as { [key: string]: MonthlyData });
    const formatYAxisTick = (value: number) => {
        if (value >= 1e3) {
            return `${value / 1e3}K`;
        } else if (value >= 1e6) {
            return `${value / 1e6}M`;
        } else {
            return value.toString();
        }
    };
    // Step 2: Prepare data for Recharts
    const chartData = Object.values(monthlyData);

    

    return (
        <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}  margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5
      }}>
                <CartesianGrid strokeDasharray="3 3"  />
                <XAxis dataKey="date" />
                <YAxis
                    tickFormatter={formatYAxisTick}
                    label={{ value: 'Amount ($)', angle: -90, position: 'insideLeft'    ,dy: -10 }}
                />
                <Tooltip formatter={formatTooltip} />
                <Legend />
                <Line type="monotone" dataKey="totalSales" name="Total Sales" stroke="#8884d8" />
                <Line type="monotone" dataKey="totalSpend" name="Total Spend" stroke="#82ca9d" />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default SalesVsSpendChart;