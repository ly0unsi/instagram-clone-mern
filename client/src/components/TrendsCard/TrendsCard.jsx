import React from 'react'
import { TrendData } from '../../Data/TrendData'
import './TrendsCard.css'
const TrendsCard = () => {
  return (
    <div className="TrendCard mt-5 pl-3 lg:pl-4">
            <h3>Trends for you</h3>
            {TrendData.map((trend,id)=>{
                return(
                    <div className="trend" key={id}>
                        <span>#{trend.name}</span>
                        <span>{trend.shares}k shares</span>
                    </div>
                )
            })}
    </div>
  )
}

export default TrendsCard