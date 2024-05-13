import React, { useEffect, useState } from 'react'
import SMDashboardCard from '../../../components/sellerPartnership/manager/dashboard/cards/SMDashboardCard'
import SellerManagerBarChart from '../../../components/sellerPartnership/manager/dashboard/charts/barcharts/SellerManagerBarChart'
import SellerManagerRadarChart from '../../../components/sellerPartnership/manager/dashboard/charts/radarChart/SellerManagerRadarChart';
import SellerManagerDonutChart from '../../../components/sellerPartnership/manager/dashboard/charts/donutChart/SellerManagerDonutChart';

function ManagerDashboard() {

    const [radarData, setRadarData] = useState({ series: [], labels: [] });

    const lineData = [
        { x: 'Jan', y: 100 },
        { x: 'Feb', y: 150 },
        { x: 'Mar', y: 200 },
        { x: 'ap', y: 100 },
        { x: 'may', y: 70 },
        { x: 'jn', y: 250 },
        // Add more data points as needed
      ];
      
      const columnData = [
        { x: 'Jan', y: 50 },
        { x: 'Feb', y: 80 },
        { x: 'Mar', y: 120 },
        { x: 'ap', y: 50 },
        { x: 'may', y: 60 },
        { x: 'jn', y: 90 },
        // Add more data points as needed
      ];

      useEffect(() => {
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

      const donutData = {
        series: [44, 55, 13, 33],
        labels: ['Apple', 'Mango', 'Orange', 'Watermelon']
      };
  return (
    <>
    <div>ManagerDashboard</div>
    <div className='seller-manager-dashboard'>
        <div className='seller-manager-dashboard-left'>
            <div className='seller-manager-dashboard-cards'>
                <SMDashboardCard title="Sales" value={145} percentageIncrease={12} />
                <SMDashboardCard title="Sales" value={145} percentageIncrease={12} />
                <SMDashboardCard title="Sales" value={145} percentageIncrease={12} />
            </div>
            <div className="seller-manager-dashboard-carts">
                <h2>Seller Manager Bar Chart</h2>
                <SellerManagerBarChart lineData={lineData} columnData={columnData} />
            </div>
        </div>
        <div className='seller-manager-dashboard-right'>
            <div className="seller-manager-dashboard-carts">
                <h2>Seller Manager Radarar Chart</h2>
                <SellerManagerRadarChart radarData={radarData} />
            </div>
            <div className="seller-manager-dashboard-carts">
                <h2>Seller Manager Donut Chart</h2>
                <SellerManagerDonutChart donutData={donutData} />
            </div>
        </div>
    </div>
    </>
  )
}

export default ManagerDashboard