import React, { useState } from 'react'
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import './Login.css';
import loginimg from './photos/studentlogin.png'
import logofull from './photos/logofull.png'
import axios from 'axios'

function StudentLogin() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: '',
    password: ''
  })

  const loginStudent = async (e) => {
    e.preventDefault();
    const { username, password } = data;
    try {
      const {data} = await axios.post('/login', {username, password});
      if(data.error){
        toast.error(data.error);
      }else{
        setData({});
        navigate('/studentprofile');
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <main>
      <div class="mainlogin">
        <div class="loginphoto">
          <img src={loginimg} alt='loginimage' class='loginimg' />
        </div>
        <div class="login">
          <img src={logofull} alt='loginimage' />
          <p class="wel">Welcome to Royal Academy</p>
          <form onSubmit={loginStudent}>
            <div class="username">
              <label for="username" class="logintxt">USERNAME</label><br/>
              <input type="text" id="username" name="username" placeholder="Enter your username" class="loginbox" value={data.username} onChange={(e) => setData({...data, username: e.target.value})} />
                       
            </div>    
            <div class="username">
              <label for="password" class="logintxt">PASSWORD</label><br/>
              <input type="password" id="password" name="password" placeholder="Enter your password" class="loginbox" value={data.password} onChange={(e) => setData({...data, password: e.target.value})} />
            </div>           
            <a href='/studentforgetpassword'><p class="forget">Forgot Password?<br/></p></a>          
            <button type="submit" >LOGIN</button>
            <a href='/register'><p class="register">New Student? <b>REGISTER</b></p></a>
          </form>
        </div>
      </div>
      
    </main>
  )
}

export default StudentLogin
