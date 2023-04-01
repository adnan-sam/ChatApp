import React, { useState, useEffect } from 'react'
import { usePostLoginMutation, usePostSignUpMutation } from '@/state/api';

function Login({setUser, setSecret}) {

  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [triggerLogin, resultlogin] = usePostLoginMutation();
  const [triggerSignUp] = usePostSignUpMutation();

  const handleLogin = () => {
    triggerLogin({username, password});
  }

  const handleRegister = () => {
    triggerSignUp({username, password});
  }

  useEffect(() => {
    if(resultlogin.data?.response) {
      setUser(username);
      setSecret(password);
    }
  }, [resultlogin.data]); //eslint-disable-line

  return (
    <div className='login-page'>
      <div className='login-container'>
      <h2 className='login-title'>CHITCHAT APP</h2>
      <h4 className='login-title'>(Integrated with ChatGPT)</h4>
      <p className='register-change' onClick={() => setIsRegister(!isRegister)}>{isRegister? "Already a user?" : "Are you a new user?"}</p>
      
      <div>
        <input className='login-input' type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)}/>
        <input className='login-input' type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <div className='login-actions'>
      {isRegister? (<button className='btn' type='button' onClick={handleRegister}>Sign Up</button>) : (<button className='btn' type='button' onClick={handleLogin}>Login</button>)}
      </div>
      </div>
    </div>
  )
}

export default Login