import React, { useContext, useEffect, useState} from 'react'
import useFetch from '../../hooks/useFetch'
import { BASE_URL } from '../../utils/config'
import '../PlayListComponent/HomeComponent.css'
import { AuthContext } from '../../context/AuthContext'
import { IoStarOutline } from "react-icons/io5";
const TrendingSongComponent = () => {
   const { data: getdata, loading, error } = useFetch(`${BASE_URL}/dance`)
   const { user } = useContext(AuthContext)
   const [trendingData,setTredingData] = useState([])
   const [ratedData,setRatedData] = useState([])
   useEffect(()=> {
      const data1=getdata.filter(data=>data.trending === true)
      setTredingData(data1)
      const data2=getdata.filter(data=>data.rating>=3)
      setRatedData(data2)
      // console.log(data)
   },[getdata])
   return (


      <div>
         <div className='header'><h1 className='title'>Trending Song</h1></div>
      <div className='main-container'>
         

         {
            loading && <h4>Loading.....</h4>
         }
         {
            error && <h4>{error}</h4>
         }
         {!loading && !error && user ? trendingData?.map(data => (<div key={data._id} className='dance-container'>
            <div className='container'><h3>Title : {data.title}</h3></div>
            <div className='container'>
               <video src={`${BASE_URL}/dance/${data.video}`} controls className='video'></video>
            </div>
            <div className='container'>
               <audio src={`${BASE_URL}/dance/${data.audio}`} controls className='audio'></audio>
            </div>
            <p>Rating : {data.rating}.0/5.0 <IoStarOutline /></p>
         </div>))
            : <p className='p-sign'>Please Sign in...</p>}
               
      </div>
      <div className='header'><h1 className='title'>Highly Rated Songs</h1></div>
      <div className='main-container'>
         

         {
            loading && <h4>Loading.....</h4>
         }
         {
            error && <h4>{error}</h4>
         }
         {!loading && !error && user ? ratedData?.map(data => (<div key={data._id} className='dance-container'>
            <div className='container'><h3>Title : {data.title}</h3></div>
            <div className='container'>
               <video src={`${BASE_URL}/dance/${data.video}`} controls className='video'></video>
            </div>
            <div className='container'>
               <audio src={`${BASE_URL}/dance/${data.audio}`} controls className='audio'></audio>
            </div>
            <p className='rating'>Rating : {data.rating}.0/5.0 <IoStarOutline /></p>
         </div>))
            : <p className='p-sign'>Please Sign in...</p>}
               
      </div>
      </div>
   )

}

export default TrendingSongComponent