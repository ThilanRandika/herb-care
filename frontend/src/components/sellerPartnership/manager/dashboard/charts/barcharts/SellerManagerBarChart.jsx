import React from 'react'
import './sellerManagerBarChat.css'
import Chart from 'react-apexcharts';

function SellerManagerBarChart({ lineData, columnData }) {

    const options = {
        chart: {
          toolbar: {
            show: true // Hide the chart toolbar
          }
        },
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'] // Sample x-axis categories
        },
        yaxis: {
          title: {
            text: 'Product Quantities' // Y-axis title
          }
        },
        title: {
          text: 'Orders and Ordered Quantity', // Chart title
          align: 'center' // Title alignment
        },
        legend: {
          position: 'top' // Legend position
        }
      };
    
      // Combine line and column data
      const series = [
        {
          name: 'Line Chart',
          type: 'line',
          data: lineData,
        },
        {
          name: 'Column Chart',
          type: 'column',
          data: columnData,
        },
      ];

  return (
    <div className="seller-manager-bar-chart">
      <Chart options={options} series={series} type="line" height="400"/>
    </div>
  )
}

export default SellerManagerBarChart