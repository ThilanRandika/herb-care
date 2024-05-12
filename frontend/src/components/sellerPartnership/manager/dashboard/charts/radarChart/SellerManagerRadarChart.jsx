import React from 'react'
import Chart from 'react-apexcharts';
import './sellerManagerRadarChart.css'

function SellerManagerRadarChart({ radarData }) {

    if (!radarData || !radarData.labels || !radarData.series) {
        return null; // Render nothing if radarData is not available
      }

      const { series, labels } = radarData;

  const options = {
    labels: labels,
    fill: {
        opacity: 0.5,
        colors: ['#ff0000', '#00ff00', '#0000ff'] // Add your desired colors here
      },
  };
      
  return (
    <div className='seller-manager-radar-chart'>
      {radarData.labels && radarData.labels.length > 0 ? (
        <Chart options={options} series={series} type="radar" height={400} />
      ) : (
        <div>No data available</div>
      )}
    </div>
  )
}

export default SellerManagerRadarChart