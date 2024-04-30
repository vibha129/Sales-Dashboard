import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DataItem {
    Date: string;
    Product: string;
    Region: string;
    [key: string]: string; // Define additional keys dynamically
  }

interface TransformedDataItem {
  Product: string;
  Date: string;
  [region: string]: number | string;
}

interface Props {
  data: DataItem[];
}



const StackedBarChart: React.FC<Props> = ({ data }) => {
    const transformData = (data: DataItem[]): TransformedDataItem[] => {
        const transformedData: { [key: string]: TransformedDataItem } = {};
      
        data.forEach((item) => {
          const key = `${item.Product}-${item.Date}`;
          if (!transformedData[key]) {
            transformedData[key] = { Product: item.Product, Date: item.Date };
          }
          transformedData[key][item.Region] = item["Total Sales"] + item["Total Investment"];
          transformedData[key][`${item.Region}_color`] = item.color;
        });

        return Object.values(transformedData);
      };
  const stackedData = transformData(data);
 
  

  return (
    <div>
        <p> Stacked Bar Chart</p>
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={stackedData}
        margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="Product" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Region 1" stackId="sales" fill="#8884d8" name="Region 1" />
        <Bar dataKey="Region 2" stackId="sales" fill="#82ca9d" name="Region 2" />
        <Bar dataKey="Region 3" stackId="sales" fill="#ffc658" name="Region 3" />
      </BarChart>
    </ResponsiveContainer>
    </div>
  );
};

export default StackedBarChart;