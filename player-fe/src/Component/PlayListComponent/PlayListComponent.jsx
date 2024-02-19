import React, { useContext, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import { BASE_URL } from '../../utils/config'
import './HomeComponent.css'
import { AuthContext } from '../../context/AuthContext'
import { IoStarOutline } from "react-icons/io5";

const PlayListComponent = () => {
   const { data: getdata, loading, error } = useFetch(`${BASE_URL}/dance`)
   const { user } = useContext(AuthContext)
   const [chooseType, setChooseType] = useState('both')
   const [suggestData, setSuggestData] = useState(null)
   const [suggestClassName, setSuggestClasName] = useState('suggestion-container')
   const [mainContainer, setMaincontainer] = useState('main-container')
   const handleChange = (e) => {
      setChooseType(e.target.value)
   }
   const handleSuggestion = (desc) => {
      // const datas = getdata.filter(data => data.rating >= rating)
      // alert(`Suggestions : ${datas.map(data => data.title)}`)
      setSuggestData(desc)
      console.log(desc)
      setMaincontainer('main-container-close')
      setSuggestClasName('suggestion-container')
      document.documentElement.style.scrollBehavior = 'smooth';
      window.scrollTo({
         top: 0,
         behavior: 'smooth', 
       });
   }
   const closehandler = () => {
      setSuggestClasName('suggestion-container-close')
      setMaincontainer('main-container')
   }

   return (

      <div className='full-container'>
         <div className={mainContainer}>

            <select value={chooseType}
               onChange={handleChange}
               name='type'
               className='choose-menu'
            >
               <option value={'audio'}>Only Audio</option>
               <option value={'video'}>Only Video</option>
               <option value={'both'}>Both</option>

            </select>
            {
               loading && <h4>Loading.....</h4>
            }
            {
               error && <h4>{error}</h4>
            }
            {!loading && !error && user ? chooseType === 'both' ? getdata.map(data => (<div key={data._id} className='dance-container'>
               <div className='container'><h3>Title : {data.title}</h3></div>
               <div className='container'>
                  <video src={`${BASE_URL}/dance/${data.video}`} controls className='video'></video>
               </div>
               <div className='container'>
                  <audio src={`${BASE_URL}/dance/${data.audio}`} controls className='audio'></audio>
               </div>
               <p className='rating'>Rating : {data.rating}.0/5.0 <IoStarOutline /> <button onClick={() => handleSuggestion(data.desc)} className='btn'>Suggestion</button></p>

            </div>))
               : chooseType === 'video' ?

                  getdata.map(data => (<div key={data._id} className='dance-container'>
                     <div className='container'><h3>Title : {data.title}</h3></div>
                     <div className='container'>
                        <video src={`${BASE_URL}/dance/${data.video}`} controls className='video'></video>
                     </div>
                     <p className='rating'>Rating : {data.rating}.0/5.0 <IoStarOutline /></p>
                  </div>))
                  : getdata.map(data => (<div key={data._id} className='dance-container'>
                     <div className='container'><h3>Title : {data.title}</h3></div>
                     <div className='container'>
                        <audio src={`${BASE_URL}/dance/${data.audio}`} controls className='audios'></audio>
                     </div>
                     <p className='rating'>Rating : {data.rating}.0/5.0 <IoStarOutline /> </p>




                  </div>)) : <p className='p-sign'>Please Sign in...</p>}

         </div>
         {suggestData &&
            <div className={suggestClassName}>
              <p className='suggest-p'> Suggestions</p>
               {
                  suggestData.map(data => (<div className='suggestion' key={data}>
                                          <div className='container'>
                        <video src={`${BASE_URL}/dance/${data}`} controls className='video'></video>
                     </div>
                  </div>))

               }
               <button onClick={closehandler} className='btn btn-close'>close</button>

            </div>
         }
      </div>
   )

}

export default PlayListComponent