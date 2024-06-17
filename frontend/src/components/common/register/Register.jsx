import React, { useState } from 'react';
import './register.css';
import { Link, useNavigate } from 'react-router-dom';
import companyLogo from '../../../Images/logo/HerbCare Logo.png';
import axios from 'axios';
import config from '../../../config';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newCustomer = {
        customer_name:name,
        email:email,
        password: password,
        address: address,
        contact_num: contactNumber,
    }
    
    axios.post(`${config.BASE_URL}/customer/register`, newCustomer)
    .then((res)=>{
        console.log(res);
        alert("Registration Success!")
        navigate('../login')
    })
    .catch((err)=>{
        console.log(err);
        alert("Registration Faild!")
    })
  };

  return (
    <>
    <div className='user-register'>
    <div className="register-header">
        <img src={companyLogo} alt="Company Logo" className="company-logo" />
    </div>
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <input className='user-register-inputs' type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <input className='user-register-inputs' type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className='user-register-inputs' type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} />
        <input className='user-register-inputs' type="text" placeholder="Contact Number" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} />
        <input className='user-register-inputs' type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className='user-register-btn' type="submit">Sign Up</button>
      </form>
    </div>
    <br />
        <h6 className='user-register-login'>if already login?<Link className='user-register-login' to={'/login'}> Login</Link></h6>
        </div>
    </>
  );
};

export default Register;
