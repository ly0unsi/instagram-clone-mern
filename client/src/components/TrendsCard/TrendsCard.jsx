import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getTrendPosts } from '../../Actions/TrendAction'
import { getTrends } from '../../Api/TrendApi'
import { TrendData } from '../../Data/TrendData'
import './TrendsCard.css'
const TrendsCard = () => {
  const { posts } = useSelector((state) => state.postReducer)
  const [trends, settrends] = useState([])
  const dispatch = useDispatch()
  const handleGetTrendPosts = (id) => {
    dispatch(getTrendPosts(id))
  }
  const fetchTrend = async () => {
    const { data } = await getTrends()

    settrends(data)
  }
  useEffect(() => {

    fetchTrend()


  }, [posts])

  return (
    <div className="TrendCard mt-5 pl-3 lg:pl-4 dark:bg-zinc-800 dark:text-gray-50 transition duration-300">
      <h3 className='dark:text-gray-300'>Trends for you</h3>
      {trends.map((trend, id) => {
        return (
          <div className="trend cursor-pointer" key={id} onClick={() => handleGetTrendPosts(trend._id)}>
            <span>{trend.name}</span>
            <span>{trend.trendPosts} shares</span>
          </div>
        )
      })}
    </div>
  )
}

export default TrendsCard