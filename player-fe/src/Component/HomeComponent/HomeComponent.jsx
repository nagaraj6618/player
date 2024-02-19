import React from 'react'
import SongTypeComponent from '../SongTypeComponent/SongTypeComponent'
import TrendingSongComponent from '../TrendingSongComponent/TrendingSongComponent'

const HomeComponent = () => {
  return (
    <div>
      <SongTypeComponent/>
      <TrendingSongComponent/>
    </div>
  )
}

export default HomeComponent