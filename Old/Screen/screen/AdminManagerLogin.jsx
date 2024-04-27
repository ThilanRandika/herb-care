import React from 'react'
import '../Login.css';
import loginimg from '../photos/managerlogin.png'
import logofull from '../photos/logofull.png'
import { Link } from 'react-router-dom'

function loginselection() {
  return (
    <main>
      <div class="mainlogin">
        <div class="loginphoto">
          <img src={loginimg} alt='loginimage' class='loginimg' />
        </div>
        <div class="login">
          <img src={logofull} alt='loginimage' />
          <p class="wel">Welcome to Royal Academy</p>          
          <br/><br/>
          <div className='adminmanagerbtn'>
            <Link to={'/managerlogin'}><button type="submit">Manager Login</button> </Link>          
          <br/><br/>             
            <Link to={'/adminlogin'}><button type="submit">Admin Login</button>   </Link>               
          </div>
        </div>
      </div>
      
    </main>
  )
}

export default loginselection
