import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataItem {
  Date: string;
  Product: string;
  Region: string;
  [key: string]: string; // Define additional keys dynamically
}

interface Props {
  data: DataItem[];
}

const ROIChart: React.FC<Props> = ({ data }) => {
    const formatCurrency = (value: number) => {
        const suffixes: string[] = ['', 'K', 'M'];
        const absValue: number = Math.abs(value);
        const suffixNum: number = Math.floor(Math.log10(absValue) / 3);
        const shortValue: number = absValue >= 1000 ? parseFloat((value / Math.pow(1000, suffixNum)).toFixed(2)) : value;
        return shortValue.toFixed(2) + suffixes[suffixNum];
    };
    
    const formatTooltip = (value: number | string) => `$${formatCurrency(typeof value === 'string' ? parseFloat(value) : value)}`;
    const formatValue = (value: number): string => {
        if (value < 1000) return value.toFixed(2);
        if (value < 1000000) return (value / 1000).toFixed(2) + 'K';
        return (value / 1000000).toFixed(2) + 'M';
      };
  const calculateROI = (totalSales: number, totalInvestment: number): number => {
    return ((totalSales - totalInvestment) / totalInvestment) * 100;
  };

  const prepareData = (data: DataItem[]): { month: string; roi: number }[] => {
    const monthlyData: { [month: string]: { totalSales: number; totalInvestment: number } } = {};
    data.forEach(item => {
        const dateParts = item.Date.split('-');
        if (dateParts.length >= 2) { // Ensure dateParts has at least two elements
          const month = `${dateParts[1]}-${dateParts[2]}`;
          if (!monthlyData[month]) {
            monthlyData[month] = {
              totalSales: 0,
              totalInvestment: 0
            };
          }
          monthlyData[month].totalSales += parseFloat(item['Total Sales']);
          monthlyData[month].totalInvestment += parseFloat(item['Total Investment']);
        }
      });

    const roiData = Object.keys(monthlyData).map(month => {
      const roi = calculateROI(monthlyData[month].totalSales, monthlyData[month].totalInvestment);
      return {
        month,
        roi
      };
    });

    return roiData;
  };

  const roiData = prepareData(data);

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={roiData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month"  />
      
        <YAxis tickFormatter={formatValue} />
        <Tooltip formatter={formatTooltip} />
        <Legend />
        <Line type="monotone" dataKey="roi" name="ROI" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ROIChart;