
import {  useMemo } from 'react'
import SalesVsSpendChart from './SalesVsSpendChart';
import ROIChart from './ROIChart';
import "./Homes.css"
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';



export default function Home() {

// get data from store.
     const salesData = useSelector((state: RootState) => state.sale_data?.data);
  // Calculate Total Sale Sum
      const TotalSalesSum= useMemo(() => {
        const sum = salesData.reduce((accumulator, sale) => {
            // Convert TotalSales string to number with two decimal places
            const totalSales = parseFloat(sale["Total Sales"]
                ).toFixed(2);
          
           
            // Check if totalSales is a valid number
            if (!isNaN(parseFloat(totalSales))) {
              return accumulator + parseFloat(totalSales);
            } else {
              console.error('Invalid TotalSales value:', sale["Total Sales"]);
              return accumulator;
            }
          }, 0);
          return parseFloat(sum.toFixed(2))
        
      }, [salesData]);
 // Calculate Total Spend Sum
      const TotalSpendSum= useMemo(() => {
        const sum = salesData.reduce((accumulator, sale) => {
            // Convert TotalSales string to number with two decimal places
            const totalSales = parseFloat(sale["Total Investment"]
                ).toFixed(2);
          
           
            // Check if totalSales is a valid number
            if (!isNaN(parseFloat(totalSales))) {
              return accumulator + parseFloat(totalSales);
            } else {
              console.error('Invalid TotalSales value:', sale["Total Investment"]);
              return accumulator;
            }
          }, 0);
          return parseFloat(sum.toFixed(2))
        
      }, [salesData]);
     // Calculate Total Impact Sum
const TotalImpact=  useMemo(() => {
    const sum = salesData.reduce((accumulator, sale) => {
        // Convert TotalSales string to number with two decimal places
        const totalSales = parseFloat(sale["Impact"]
            ).toFixed(2);
      
       
        // Check if totalSales is a valid number
        if (!isNaN(parseFloat(totalSales))) {
          return accumulator + parseFloat(totalSales);
        } else {
          console.error('Invalid TotalSales value:', sale["Impact"]);
          return accumulator;
        }
      }, 0);
      return parseFloat(sum.toFixed(2))
    
  }, [salesData]);
  const ROI = useMemo(() => {
    // Calculate total benefits (Total Sales + Impact)
    const totalBenefits = TotalSalesSum + TotalImpact;
    console.log(totalBenefits,"totalBenefits")
    // Calculate ROI
    if (TotalSpendSum !== 0) {
        return ((totalBenefits - TotalSpendSum) / TotalSpendSum) * 100;
    } else {
        
        return 0;
    }
}, [TotalSalesSum, TotalImpact, TotalSpendSum]);

const formatAmount = (value: number): string => {
    const absValue = Math.abs(value);
    if (absValue >= 1e6) {
        return (value / 1e6).toFixed(2) + 'M'; // Convert to million and keep 2 decimal places
    } else if (absValue >= 1e3) {
        return (value / 1e3).toFixed(2) + 'K'; // Convert to thousand and keep 2 decimal places
    } else {
        return value.toFixed(2); // Keep the original value if it's less than 1000
    }
};

  return (
    <div>

        <div className='total_box'>

            <p className='sum_title'> Total Sales :{formatAmount(TotalSalesSum)}</p>
            <p className='spend_sum_title'>Total Spend :{formatAmount(TotalSpendSum)}</p>
            <p className='impact_sum_title'>Total Impact :{formatAmount(TotalImpact)}</p>
            <p className='roi_sum_title'> ROI
 :{formatAmount(ROI)}</p>
        </div>
<div className='graph_container'>
<div>
    <p>Sales VS Spend Trend over time (Monthly)
</p>
        <SalesVsSpendChart data={salesData}/>
        </div>
        <div>
            <p>ROI trend over time (Monthly)</p>
        <ROIChart data={salesData} />
        </div>
        </div>
    </div>
  )
}