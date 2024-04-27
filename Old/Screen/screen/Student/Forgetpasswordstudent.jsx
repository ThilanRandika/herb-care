import React, { useState } from 'react'
import './Login.css';
import loginimg from './photos/studentlogin.png'
import logofull from './photos/logofull.png'
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Forgetpasswordstudent() {
  const [username, setusername] = useState("");
  const [SecAnswer, setSecAnswer] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [rePassword, setrePassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== rePassword) {
      toast.error("Passwords do not match");
      return;
    } else {
      try {
        const res = await axios.post("/forgotpassword", {
          username,
          newPassword,
          SecAnswer,
        });
        if (res && res.data.success) {
          toast.success(res.data && res.data.message);
  
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <main>
      <div class="mainlogin">
        <div class="loginphoto">
          <img src={loginimg} alt='loginimage' class='loginimg' />
        </div>
        <div class="login">
          <img src={logofull} alt='loginimage' />
          <p class="troub1">TROUBLE LOGIN?</p>
          <p class="troub2">Please enter your username and answer the security question in the fields below to continue</p>

        
          <form onSubmit={handleSubmit} >
            <div class="username">
              <label for="username" class="logintxt">USERNAME</label><br/>
              <input type="text" id="username" name="username" placeholder="Enter your username" class="loginbox" value={username} onChange={(e) => setusername(e.target.value)}/>                        
            </div>  
            <div class="username">
                <label for="securityans" class="logintxt">SECURITY QUESTION - What city were you born in?</label><br/>
                <input type="text" id="securityans" name="securityans" placeholder="Enter your answer" class="loginbox" value={SecAnswer} onChange={(e) => setSecAnswer(e.target.value)}/>
            </div>
            <div class="username">
                <label for="password" class="logintxt">NEW PASSWORD</label><br/>
                <input type="password" id="password" name="password" placeholder="Enter your new password" class="loginbox" value={newPassword} onChange={(e) => setnewPassword(e.target.value)}/>
            </div>
            <div class="username">
            <label for="repassword" class="logintxt">RE-ENTER PASSWORD</label><br/>
              <input type="password" id="repassword" name="repassword" placeholder="Enter your password again" class="loginbox" value={rePassword} onChange={(e) => setrePassword(e.target.value)}/>
            </div>
            <br/>
            <button class="reset" type="submit">RESET YOUR PASSWORD</button>
            <a href='/login'><p class="register">Already have an Account? <b>Log IN</b></p></a>
          </form>


        </div>
      </div>
      
    </main>
  )
}

export default Forgetpasswordstudent
