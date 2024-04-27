import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import './Login.css';
import loginimg from './photos/studentlogin.png'
import logofull from './photos/logofull.png'

function StudentRegister() {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: '',
    email: '',
    contactnumber: '',
    username: '',
    password: '',
    repassword: ''    
  })

  const registerStudent = async (e) => {
    e.preventDefault();
    if (data.password !== data.repassword) {
      toast.error('Passwords do not match');
      return;
    }else{
      const { name, email, contactnumber, username, password } = data;
    try {
      const {data} = await axios.post('/register', {name, email, contactnumber, username, password});
      if(data.error){
        toast.error(data.error);
      }else{
        setData({})
        toast.success("Register Successfully!");
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
    }
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
          <form onSubmit={registerStudent}>
          <div class="username">
              <label for="name" class="logintxt">FULL NAME</label><br/>
              <input type="text" id="name" name="name" placeholder="Enter your full name" class="loginbox" value={data.name} onChange={(e) => setData({...data, name: e.target.value})}/>                        
            </div>  
            <div class="username">
                <label for="email" class="logintxt">EMAIL</label><br/>
                <input type="email" id="email" name="email" placeholder="Enter your email" class="loginbox" value={data.email} onChange={(e) => setData({...data, email: e.target.value})}/>
            </div>
            <div class="username">
                <label for="pnumber" class="logintxt">CONTACT NUMBER</label><br/>
                <input type="number" id="contactnumber" name="contactnumber" placeholder="Enter your contact number" class="loginbox" value={data.contactnumber} onChange={(e) => setData({...data, contactnumber: e.target.value})}/>
            </div>
            <div class="username">
                <label for="username" class="logintxt">USERNAME</label><br/>
                <input type="text" id="username" name="username" placeholder="Enter your contact number" class="loginbox" value={data.username} onChange={(e) => setData({...data, username: e.target.value})}/>
            </div>            
            <div class="username">
                <label for="password" class="logintxt">PASSWORD</label><br/>
                <input type="password" id="password" name="password" placeholder="Enter your password" class="loginbox" value={data.password} onChange={(e) => setData({...data, password: e.target.value})}/>
            </div>
            <div class="username">
            <label for="repassword" class="logintxt">RE-ENTER PASSWORD</label><br/>
              <input type="password" id="repassword" name="repassword" placeholder="Enter your password again" class="loginbox" value={data.repassword} onChange={(e) => setData({...data, repassword: e.target.value})}/>
            </div>
            <br/>
            <button type="submit" > SIGN UP</button>
            <a href='/login'><p class="register">Already have an Account? <b>Log IN</b></p></a>
          </form>
        </div>
      </div>
      
    </main>
  )
}

export default StudentRegister
