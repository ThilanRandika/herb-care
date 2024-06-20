import { useContext, useEffect, useState } from "react";
import './sellerHome.css'
import SMDashboardCard from "../../../components/sellerPartnership/manager/dashboard/cards/SMDashboardCard";
import SellerManagerBarChart from "../../../components/sellerPartnership/manager/dashboard/charts/barcharts/SellerManagerBarChart";
import SellerManagerDonutChart from "../../../components/sellerPartnership/manager/dashboard/charts/donutChart/SellerManagerDonutChart";
import SellerManagerRadarChart from "../../../components/sellerPartnership/manager/dashboard/charts/radarChart/SellerManagerRadarChart";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from '../../../context/AuthContext';
import config from "../../../config";

function SellerHome() {
  const [radarData, setRadarData] = useState({ series: [], labels: [] });
  const [completeCount, setCompleteCount] = useState('');
  const [processingCount, setProcessingCount] = useState('');
  const [amounts, setAmounts] = useState([]);
  const [lineData, setLineData] = useState([]);
  const [columnData, setColumnData] = useState([]);
  const { user } = useContext(AuthContext)


      useEffect(() => {

        axios.get(`${config.BASE_URL}/sellerHome/completedOrders/count/${user.sellerId}`)
        .then((res)=> {
          console.log(res.data)
          setCompleteCount(res.data)
        })
        .catch((err)=>{
          console.log(err)
        })

        axios.get(`${config.BASE_URL}/sellerHome/all/processingOrders/count/${user.sellerId}`)
        .then((res)=> {
          console.log(res.data)
          setProcessingCount(res.data)
        })
        .catch((err)=>{
          console.log(err)
        })
        
        axios.get(`${config.BASE_URL}/sellerHome/totalOrderedAmount/${user.sellerId}`)
        .then((res)=> {
          console.log(res.data)
          setAmounts(res.data)
        })
        .catch((err)=>{
          console.log(err)
        })

        // axios.get('${config.BASE_URL}/sellerHome/orders/months/count/${user.sellerId}')
        // .then((res)=> {
        //   console.log(res.data.lineData)
        //   setLineData(res.data.lineData)
        // })
        // .catch((err)=>{
        //   console.log(err)
        // })

        axios.get(`${config.BASE_URL}/sellerHome/quantity/months/count/${user.sellerId}`)
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