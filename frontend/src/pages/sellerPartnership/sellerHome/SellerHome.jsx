import { useEffect, useState } from "react";
import './sellerHome.css'
import SMDashboardCard from "../../../components/sellerPartnership/manager/dashboard/cards/SMDashboardCard";
import SellerManagerBarChart from "../../../components/sellerPartnership/manager/dashboard/charts/barcharts/SellerManagerBarChart";
import SellerManagerDonutChart from "../../../components/sellerPartnership/manager/dashboard/charts/donutChart/SellerManagerDonutChart";
import SellerManagerRadarChart from "../../../components/sellerPartnership/manager/dashboard/charts/radarChart/SellerManagerRadarChart";
import axios from "axios";
import { Link } from "react-router-dom";

function SellerHome() {
  const [radarData, setRadarData] = useState({ series: [], labels: [] });
  const [completeCount, setCompleteCount] = useState('');
  const [processingCount, setProcessingCount] = useState('');
  const [amounts, setAmounts] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [columnData, setColumnData] = useState([]);


      useEffect(() => {

        axios.get('http://localhost:8070/sellerHome/completedOrders/count')
        .then((res)=> {
          console.log(res.data)
          setCompleteCount(res.data)
        })
        .catch((err)=>{
          console.log(err)
        })

        axios.get('http://localhost:8070/sellerHome/all/processingOrders/count')
        .then((res)=> {
          console.log(res.data)
          setProcessingCount(res.data)
        })
        .catch((err)=>{
          console.log(err)
        })
        
        axios.get('http://localhost:8070/sellerHome/totalOrderedAmount')
        .then((res)=> {
          console.log(res.data)
          setAmounts(res.data)
        })
        .catch((err)=>{
          console.log(err)
        })

        // axios.get('http://localhost:8070/sellerHome/orders/months/count')
        // .then((res)=> {
        //   console.log(res.data.lineData)
        //   setLineData(res.data.lineData)
        // })
        // .catch((err)=>{
        //   console.log(err)
        // })

        axios.get('http://localhost:8070/sellerHome/quantity/months/count')
        .then((res)=> {
          console.log(res.data.columnData)
          setColumnData(res.data.columnData)
          setLineData(res.data.columnData)
        })
        .catch((err)=>{
          console.log(err)
        })

        setRadarData({
          series: [
            {
              name: "Radar Series 1",
              data: [45, 52, 38, 24, 33, 10]
            },
            {
              name: "Radar Series 2",
              data: [26, 21, 20, 6, 8, 15]
            }
          ],
          labels: [1,2,3,4,5,6],
        });
      }, []);

      
      
      
      
  return (
    <>

    <div className='seller-Home-dashboard'>
        <div className='seller-Home-dashboard-left'>
            <Link className='seller-Home-dashboard-cards' to={'../orders'}>
              
                <SMDashboardCard title="Processing Orders" value={processingCount} percentageIncrease={12} />
                <SMDashboardCard title="Complete Orders" value={completeCount} percentageIncrease={12} />
                <SMDashboardCard title="Sales" value={145} percentageIncrease={12} />
            </Link>
            <div className="seller-Home-dashboard-carts">
                <h2>Product Quantities</h2>
                <SellerManagerBarChart lineData={lineData} columnData={columnData} />
            </div>
        </div>
        <div className='seller-Home-dashboard-right'>
            {/* <div className="seller-Home-dashboard-carts">
                <h2>Seller Home Radarar Chart</h2>
                <SellerHomeRadarChart radarData={radarData} />
            </div> */}
            <div className="seller-Home-dashboard-carts">
                <h2>Orders Summery</h2>
                <SellerManagerDonutChart donutData={amounts} />
            </div>
        </div>
    </div>
    </>
    
  )
}

export default SellerHome