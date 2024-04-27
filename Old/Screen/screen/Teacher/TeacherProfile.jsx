import React, { useEffect, useState } from 'react'
import './profile.css'
import home from './navbar_images/Home.png'
import classes from './navbar_images/Class.png'
import pay from './navbar_images/Pay.png'
import time from './navbar_images/Time.png'
import attendance from './navbar_images/Attendance.png'
import qa from './navbar_images/Qa.png'
import feedback from './navbar_images/Feedback.png'
import profile from './navbar_images/Profile.png'
import logout from './navbar_images/Logout.png'
import logo from './photos/logofull.png'
import user from './photos/User.png'
import axios from 'axios'
import { Link } from 'react-router-dom'

function TeacherProfile() {

    const [name, setName] = useState();
    const [username, setUsername] = useState();
    const [email, setEmail] = useState();
    const [contactnumber, setContactnumber] = useState();
    const [gender, setGender] = useState();
    const [subject, setSubject] = useState();
    const [secanswer, setSecAnswer] = useState();

    useEffect(()=>{
        axios.get('/teacherprofile')
        .then((res)=>{
            setName(res.data.name);
            setUsername(res.data.username);
            setEmail(res.data.email);
            setContactnumber(res.data.contactnumber);
            setGender(res.data.gender);
            setSubject(res.data.subject);            
            setSecAnswer(res.data.SecAnswer);  
        })
        .catch((err)=>{
            console.log(err);
        })
    },[])

    const handleDelete = () => {
        axios.get('/logout').then(res => {
            console.log(res);
            window.location.href = '/';
        }).catch(err => console.log(err));
    }
  return (
    <main>
        <div className='profilecontent'>
            <div className='sidenavbar'>                
                <ul className='sidenavbarul'>
                    <li>
                        <img src={home} alt='home' className='navimage'/>
                        <a href='/login'>Dashboard</a>
                    </li>
                    <li>
                        <img src={classes} alt='home' className='navimage'/>
                        <a href='/login'>My Classes</a>
                    </li>                    
                    <li>
                        <img src={pay} alt='home' className='navimage'/>
                        <a href='/login'>Salary</a>
                    </li>
                    <li>
                        <img src={pay} alt='home' className='navimage'/>
                        <a href='/login'>Payment</a>
                    </li>
                    <li>
                        <img src={time} alt='home' className='navimage'/>
                        <a href='/login'>TimeTable</a>
                    </li>
                    <li>
                        <img src={attendance} alt='home' className='navimage'/>
                        <a href='/login'>Attendance</a>
                    </li>
                    <li>
                        <img src={qa} alt='home' className='navimage'/>
                        <a href='/login'>Q&A</a>
                    </li>
                    <li>
                        <img src={feedback} alt='home' className='navimage'/>
                        <a href='/login'>Feedbacks</a>
                    </li>
                    <li>
                        <img src={profile} alt='home' className='navimage'/>
                        <a href='/login'>Profile</a>
                    </li>
                    
                    <br/><br/><br/><br/>
                    <li className='logoutsq'>
                        <img src={logout} alt='home' className='navimage'/>                        
                        <button className='logoutbtn' onClick={handleDelete}>Logout</button>
                    </li>
                </ul>
            </div>
            <div>
                <table>
                    <tr>
                        <td className='tbllogo'>
                            <img src={logo} alt='logo'/>
                        </td>
                        <td>
                            <p class='hellotxt'><b>Hello, {name}</b><br/>Teacher</p>
                        </td>
                        <td>
                            <img src={user} alt='logo' class='hellopic'/>
                        </td>
                    </tr>
                </table>    
                <p class='usertxt'>User Profile</p> 
                <div class="line1"></div>  
                <table>
                    <tr>
                        <td>
                            <img src={user} alt='logo'/>
                        </td>
                        <td>
                            <p class='hellotxt'>{name}<br/>Teacher</p>
                        </td>
                        <td>
                             <Link to={'/teacherprofileedit'}><button className='btnedit' type="submit">Edit Button</button> </Link>
                        </td>
                    </tr>
                </table>  
                <div class="line"></div>   
                <p class='userprofiletxt'>Full name</p>  
                <div className='profilebox'>{name}</div>
                <p class='userprofiletxt'>Username</p>  
                <div className='profilebox'>{username}</div> 
                <p class='userprofiletxt'>Gender</p>  
                <div className='profilebox'>{gender}</div>
                <br/>
                <div class="line"></div>
                <table>
                    <tr>
                        <td className='conatctcol'>
                            <p class='userprofiletxt'>Email Address</p>  
                            <div className='profilebox'>{email}</div>  
                        </td>
                        <td>
                            <p class='userprofiletxt'>Phone Number</p>  
                            <div className='profilebox'>{contactnumber}</div>
                        </td>
                    </tr>
                </table>
                <br/>
                <div class="line"></div>
                <table>
                    <tr>                        
                        <td>
                            <p class='userprofiletxt'>Subject</p>  
                            <div className='profilebox'>{subject}</div>  
                        </td>
                    </tr>
                </table>
                <br/>
                <div class="line"></div>
                <p class='userprofiletxt'>Security Question - What city were you born in?</p>  
                <div className='profilebox'>{secanswer}</div> 
                <br/>
                <div class="line"></div>                
                <br/>
            </div>            
        </div>
    </main>
  )
}

export default TeacherProfile
