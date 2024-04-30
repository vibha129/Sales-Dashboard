import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import "./Piechartpage.css"
interface DataItem {
    Date: string;
    Product: string;
    Region: string;
    [key: string]: string; // Define additional keys dynamically
}
interface MonthlyData {
    date: string;
    totalSales: number;
    totalInvestment: number;
    Impact:number;
}


const LineChartComponent: React.FC<{ data: DataItem[] }> = ({ data }) => {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const [filteredData, setFilteredData] = useState<MonthlyData[]>([]);


  const formatCurrency = (value: number) => {
    const suffixes: string[] = ['', 'K', 'M'];
    const absValue: number = Math.abs(value);
    const suffixNum: number = Math.floor(Math.log10(absValue) / 3);
    const shortValue: number = absValue >= 1000 ? parseFloat((value / Math.pow(1000, suffixNum)).toFixed(2)) : value;
    return shortValue + suffixes[suffixNum];
};

const formatTooltip = (value: number | string) => `$${formatCurrency(typeof value === 'string' ? parseFloat(value) : value)}`;
  useEffect(() => {
    if (!selectedProduct || !selectedRegion) return;
    
    const filtered = data.filter(item => item.Product === selectedProduct && item.Region === selectedRegion);


    const monthlyData = filtered.reduce((acc, entry) => {
        const date = entry.Date;
        if (!date) {
            return acc; // Skip this entry if Date is undefined
        }
        const month = date.split('-')[1] + '-' +date.split('-')[2];

        if (!acc[month]) {
            acc[month] = { date: month, totalSales: parseFloat(entry["Total Sales"]), totalInvestment: parseFloat(entry["Total Investment"]) ,Impact:parseFloat(entry["Impact"])};
        } else {
            acc[month].totalSales += parseFloat(entry["Total Sales"]);
            acc[month].totalInvestment += parseFloat(entry["Total Investment"]);
        }
        
        return acc;
    }, {} as { [key: string]: MonthlyData });






  
    // Step 2: Prepare data for Recharts
    const chartData = Object.values(monthlyData);
    setFilteredData(chartData);
  }, [selectedProduct, selectedRegion, data]);
  const formatYAxisTick = (value: number) => {
    if (value >= 1e3) {
        return `${value / 1e3}K`;
    } else if (value >= 1e6) {
        return `${value / 1e6}M`;
    } else {
        return value.toString();
    }
};

  // Assuming you have parsed the dates and grouped data by week
  // const groupedData = groupDataByWeek(parsedData);

  return (
    <div>
      <div>
      <p>Line Chart</p>
      <div className='selection_box'>
<div  className='option-box'>
<label>Select Product:</label>
<select style={{cursor:"pointer"}}value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
<option value={""}>Choose</option>
<option style={{cursor:"pointer"}} value="Product B">Product B</option>
<option value="Product C">Product C</option>
<option value="Product A">Product A</option>

</select>
</div>
<div  className='option-box'>
<label>Select Region:</label>
<select style={{cursor:"pointer"}} value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
  <option value={""}>Choose</option>
<option value="Region 1">Region 1</option>
<option value="Region 2">Region 2</option>
<option value="Region 3">Region 3</option>
</select>
</div>
</div>

      </div>
      {filteredData && filteredData?.length>0 ?
     <ResponsiveContainer width="100%" height={400}>
     <LineChart data={filteredData}  margin={{
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
         <Line type="monotone" dataKey="totalInvestment" name="Total Investment" stroke="#82ca9d" />
         <Line type="monotone" dataKey="Impact" name="Impact" stroke="#82ca9d" />
     </LineChart>
 </ResponsiveContainer>
      :<div className='empty-box'><p>Select a <b>product</b> and <b>region</b> , then visualize the data</p></div> }
    </div>
  );
};

export default LineChartComponent;