import React from 'react'
import './sMDashboardCard.css'

function SMDashboardCard({ title, value, percentageIncrease }) {
  return (
    <div className="smDashboard-card">
      <h3 className="smDashboard-card-title">{title}</h3>
      <div className="smDashboard-card-value">
        <span className="value-number">{value}</span>
        <span className="value-unit"></span>
      </div>
      <div className="smDashboard-card-percentage-increase">
        <span className="percentage-sign">{percentageIncrease > 0 ? "+" : ""}</span>
        <span className="percentage-number">{percentageIncrease}%</span>
      </div>
    </div>
  )
}

export default SMDashboardCard