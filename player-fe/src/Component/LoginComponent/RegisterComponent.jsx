import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../utils/config';
import { AuthContext } from '../../context/AuthContext';
const RegisterComponent = () => {
  const [credentials, setCredentials] = useState({
    userName: undefined,
    email: undefined,
    password: undefined
  });
  const { dispatch } = useContext(AuthContext)
  const navigate = useNavigate()
  const handleChange = e => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }))
  };

  const handleClick = async e => {
    e.preventDefault();
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'post',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(credentials)
      })
      const result = await res.json()
      if (!res.ok) alert(result.message)

      dispatch({ type: 'REGISTER_SUCCESS' })
      navigate('/login')


    }

    catch (err) {
      alert(err.message)
    }
  }

  return (
    <section>
      <div className="login-container">
        <div className="login-form">
          <h2>Register</h2>
          <form onSubmit={handleClick}>
            <div className='input-container'>
              <input type="email" placeholder="Email" required id="email"
                onChange={handleChange} />
            </div>
            <div className='input-container'>
              <input type="text" placeholder="Username" required id="username"
                onChange={handleChange} />
            </div>
            <div className='input-container'>
              <input type="password" placeholder="Password" required id="password"
                onChange={handleChange} />
            </div>
            <button className="btn secondary__btn auth__btn"
              type="submit">Login</button>
          </form>
          <p>Do have an account?<Link to='/login'>Sign in</Link></p>
        </div>
      </div>

    </section>
  )
}

export default RegisterComponent