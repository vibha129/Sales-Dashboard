import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import "./Piechartpage.css"
interface DataItem {
  Date: string;
  Product: string;
  Region: string;
  [key: string]: string; // Define additional keys dynamically
}

// const data: DataItem[] = [
//   { Date: '20-03-2022', Product: 'Product A', Region: 'Region 3', 'Radio Contribution': '4100.40564', 'TV Contribution': '3401.692633' /* Add more data */ },
//   { Date: '20-03-2022', Product: 'Product B', Region: 'Region 1', 'Radio Contribution': '2376.328341', 'TV Contribution': '4417.020216' /* Add more data */ },
//   // Add more data
// ];

interface ChannelData {
  name: string;
  value: number;
}
interface Props{
  data:DataItem[];
}

const App: React.FC<Props> = ({ data })  => {
  const [selectedProduct, setSelectedProduct] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');
  const [chartData, setChartData] = useState<ChannelData[]>([]);
 


useEffect(() => {
const filteredData = data.filter(item => item.Product === selectedProduct && item.Region === selectedRegion);


const calculateTotalSales = (filteredData: DataItem[]): number => {
  return filteredData.reduce((acc, item) => acc + parseFloat(item['Total Sales']), 0);
};

if (filteredData.length > 0) {
  const totalSales = calculateTotalSales(filteredData);
  const channelData: ChannelData[] = Object.keys(filteredData[0]) // Assuming the keys are the same for all items
    .filter(key => key.includes("Contribution"))
    .map(key => ({
      name: key,
      value: filteredData.reduce((acc, item) => acc + parseFloat(item[key]), 0) / totalSales * 100
    }));
console.log(channelData)
  setChartData(channelData);
}
}, [selectedProduct, selectedRegion,data]);

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF']; // Define colors for pie chart segments
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }:any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

return (
<div>
  <p>Pie Chart</p>
<div className='selection_box'>
<div className='option-box'>
<label>Select Product:</label>
<select style={{cursor:"pointer"}}value={selectedProduct} onChange={(e) => setSelectedProduct(e.target.value)}>
<option value={""}>Choose</option>
<option style={{cursor:"pointer"}} value="Product B">Product B</option>
<option value="Product C">Product C</option>
<option value="Product A">Product A</option>

</select>
</div>
<div className='option-box'>
<label>Select Region:</label>
<select style={{cursor:"pointer"}} value={selectedRegion} onChange={(e) => setSelectedRegion(e.target.value)}>
  <option value={""}>Choose</option>
<option value="Region 1">Region 1</option>
<option value="Region 2">Region 2</option>
<option value="Region 3">Region 3</option>
</select>
</div>
</div>


<div style={{ width: '100%', height: '400px' }}>
  {chartData && chartData.length>0 ?
<ResponsiveContainer>
<PieChart>
<Pie
           data={chartData}
           dataKey="value"
           nameKey="name"
           label={renderCustomizedLabel}
           cx="50%"
           cy="50%"
           outerRadius={100}
           fill="#8884d8"
           labelLine={false}
           
         >
{chartData.map((entry: ChannelData, index: number) => (
  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
))}

</Pie>
<Tooltip formatter={(value:number, name) => [`${name}: ${value?.toFixed(2)}`, '']} />
<Legend />
</PieChart>
</ResponsiveContainer>
:<div className='empty-box'><p>Select a <b>product</b> and <b>region</b> , then visualize the data</p></div>}
</div>
</div>
);
};

export default App;