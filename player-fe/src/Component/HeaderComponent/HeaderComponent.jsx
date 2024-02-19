import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import UploadComponent from '../UploadComponent/UploadComponent'
import './HeaderComponent.css'
import LoginComponent from '../LoginComponent/LoginComponent'
import RegisterComponent from '../LoginComponent/RegisterComponent'
import { AuthContext } from '../../context/AuthContext'
import PlayListComponent from '../PlayListComponent/PlayListComponent'
import HomeComponent from '../HomeComponent/HomeComponent'

const HeaderComponent = () => {
  const { user, dispatch } = useContext(AuthContext)

  const logout = () => {
    dispatch({ type: 'LOGOUT' })
    window.location.href = '/'
  }
  return (
    <BrowserRouter >
      <div className="nav-container">
        <ul className="container-wrapper">

          <li className='nav-item'><Link to='/' className="nav-items">Home</Link></li>
          <li className='nav-item'><Link to='/upload' className="nav-items">Upload</Link></li>
          <li className='nav-item'><Link to='/playlist' className="nav-items">PlayList</Link></li>
        </ul>

        {
          user ? <div className='user-container'>
            <h5 className='mb-0 user-name'>{user.username}</h5>

            <li className='logout-item' onClick={logout}>Logout</li>
          </div> : <ul className='auth-container'>

            <li className='nav-item'><Link to='/login' className="nav-items">Login</Link></li>
            <li className='nav-item'><Link to='/register' className="nav-items">Register</Link></li>
          </ul>
        }
      </div>

      <Routes>
        <Route excat path='/' element={<HomeComponent/>}></Route>
        <Route path="/playlist" element={<PlayListComponent />}></Route>
        <Route path="/upload" element={<UploadComponent />}></Route>
        <Route path="/login" element={<LoginComponent />}></Route>
        <Route path="/register" element={<RegisterComponent />}></Route>
      </Routes>


    </BrowserRouter>
  )
}

export default HeaderComponent



