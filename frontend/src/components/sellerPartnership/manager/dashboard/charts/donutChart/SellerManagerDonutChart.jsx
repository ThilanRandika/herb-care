import React from 'react';
import Chart from 'react-apexcharts';
import './sellerManagerfDonutChart.css'; // Import CSS file for styling

function SellerManagerDonutChart({ donutData }) {
  const { series, labels } = donutData;

  const options = {
    labels: labels,
    chart: {
      type: 'donut'
    }
  };

  return (
    <div className="seller-manager-donut-chart">
      {donutData.labels && donutData.labels.length > 0 ? (
            <Chart options={options} series={series} type="donut" height={400} />
        ) : (
            <div>No data available</div>
        )}
    </div>
  );
}

export default SellerManagerDonutChart;
