
import Piechartpage from './Piechartpage';

import "./Piechartpage.css"
import StackedBarChart from './StackedbarChart';
import LineChartComponent from './LineChartComponent';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

type Props = {}

const Dashboard = (props: Props) => {

//   get data from store.
    const data = useSelector((state: RootState) => state.sale_data?.data);
  
 

 
  return (
    <>
    
    
    <div className='dashboard_box'>
          
          <Piechartpage data={data} />
          
          <LineChartComponent data={data} />
      </div>
      <StackedBarChart  data={data} />
      </>
  )
}
export default Dashboard;