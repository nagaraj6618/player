

import React, {
  useState, useContext
} from 'react';

import { Link, useNavigate } from 'react-router-dom';
import './login.css';

import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../utils/config';

const LoginComponent = () => {

  const [credentials, setCredentials] = useState({
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
    dispatch({ typte: 'LOGIN_START' })
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: "post",
        headers: {
          "content-type": "application/json",

        },
        credentials: 'include',
        body: JSON.stringify(credentials),
      })
      const result = await res.json()
      if (!res.ok) alert(result.message)
      dispatch({ type: 'LOGIN_SUCCESS', payload: result.data })
      navigate('/')
    }
    catch (err) {
      dispatch({ type: 'LOGIN_FAILURE', payload: err.message })
    }
  }

  return (<section>

    <div className="login-container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleClick}>
          <div className='input-container'>
            <input type="email" placeholder="Email" required id="email"
              onChange={handleChange} />
          </div>
          <div className='input-container'>
            <input type="password" placeholder="Password" required id="password"
              onChange={handleChange} />
          </div>
          <button className="btn secondary__btn auth__btn"
            type="submit">Login</button>
        </form>
        <p>Don't have an account?<Link to='/register'>Create</Link></p>
      </div>
    </div>

  </section>
  );
};

export default LoginComponent;