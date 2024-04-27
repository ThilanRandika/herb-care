import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddClassForm = ({ onSubmit }) => {
  const [date, setDate] = useState('');
  const [Class_ID, setClass_ID] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [grade, setGrade] = useState('');
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');
  const [hall, setHall] = useState('');
  const [price, setPrice] = useState('');
  const [managerId, setManagerId] = useState('');
  const [addedDate, setAddedDate] = useState('');
  const navigator = useNavigate('');
  const [todayDate, setTodayDate] = useState('');
 
  const handleSubmit = (e) => {
    e.preventDefault();
    const newClass = {
      Date: date,
      Class_ID:Class_ID,
      Start_time: startTime,
      End_Time: endTime,
      Grade: grade,
      Subject: subject,
      Teacher: teacher,
      Hall: hall,
      Price: parseFloat(price), // Convert to number
      Manager_ID: managerId,
      Added_Date: todayDate,
    };
    axios.post('http://localhost:5000/Manager/Timetable/AddnewClasstime', newClass)
      .then(res => {
        console.log(res);
        navigator('/Manager/Timetable');

      })
      .catch(err => console.error(err));
  };
  useEffect(() => {
    const currentDate = new Date().toISOString().split('T')[0];
    setTodayDate(currentDate);

    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const currentTime = `${currentHour}:${currentMinute}`;
    setStartTime(currentTime);
  }, []);

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    if (selectedDate === todayDate) {
      const currentHour = new Date().getHours();
      const currentMinute = new Date().getMinutes();
      const currentTime = `${currentHour}:${currentMinute}`;
      setStartTime(currentTime);
    } else {
      setStartTime('currentTime');
    }
  };

  const handleStartTimeChange = (e) => {
    const selectedStartTime = e.target.value;
    setStartTime(selectedStartTime);
    if (!endTime || selectedStartTime > endTime) {
      setEndTime(selectedStartTime);
    }
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };
  return (
  <div className=' flex p-2 h-screen 'style={{ width: '1020px'}}> 
      
        <br></br>
     <div  style={{ alignItems:'center'}}>
    <form  style={{ alignItems:'center',marginTop:'30px'}} onSubmit={handleSubmit} >
      <br></br>
    <h1 className=''> <center>
        Add New Class Time</center>
    </h1>

    <br></br>
    
              <label style={{ marginLeft: '80px'}} >
                <span >Date:</span>
                <input className='  ' style={{ marginLeft: '20px',backgroundColor:'#EEFEF4',width:'180px',display: 'inline-block', padding: '0.2rem 1rem', textAlign: 'center', borderRadius: '0.25rem', color: 'black', textDecoration: 'none'  }}
                type="date" value={date}   min={todayDate}   onChange={handleDateChange} required  />
              </label>
        
       

              <label className=""style={{ marginLeft: '60px'}}>
                <span className="text-lg ml-20">Class ID</span>
                <input style={{ marginLeft: '20px',backgroundColor:'#EEFEF4',width:'180px',display: 'inline-block', padding: '0.2rem 1rem', textAlign: 'center', borderRadius: '0.25rem', color: 'black', textDecoration: 'none'  }} type="text"  
                  value={Class_ID} onChange={(e) => setClass_ID(e.target.value)} required />
              </label>
                
        
              <label className=""style={{ marginLeft: '60px'}}>
                <span className="text-lg ml-20">Start Time:</span>
                <input style={{ marginLeft: '20px',backgroundColor:'#EEFEF4',width:'180px',display: 'inline-block', padding: '0.2rem 1rem', textAlign: 'center', borderRadius: '0.25rem', color: 'black', textDecoration: 'none'  }} type="time"  
                  value={startTime}
                  min={startTime}
                  onChange={handleStartTimeChange} required />
              </label>
                
       
      
              <label className=""style={{ marginLeft: '60px'}}>
                <span className="text-lg">End Time:</span>
                <input  style={{ marginLeft: '20px',backgroundColor:'#EEFEF4',width:'150px',display: 'inline-block', padding: '0.2rem 1rem', textAlign: 'center', borderRadius: '0.25rem', color: 'black', textDecoration: 'none'  }}
                type="time"   value={endTime}
                min={startTime}
                onChange={handleEndTimeChange} required  />
              </label><br/>      <br></br><br></br>
    

       
            <label className=" mb-2" style={{ marginLeft: '70px'}} >
              <span className="text-lg">Grade:</span>
              <input style={{ marginLeft: '20px',width:'90px',backgroundColor:'#EEFEF4',width:'180px',display: 'inline-block', padding: '0.2rem 1rem', textAlign: 'center', borderRadius: '0.25rem', color: 'black', textDecoration: 'none'  }} type="text" value={grade} onChange={(e) => setGrade(e.target.value)} required  />
            </label>
              
            <label className=" mb-2"style={{ marginLeft: '60px'}} >
              <span className="text-lg">Subject:</span>
              <input style={{ marginLeft: '40px',backgroundColor:'#EEFEF4',width:'180px',display: 'inline-block', padding: '0.2rem 1rem', textAlign: 'center', borderRadius: '0.25rem', color: 'black', textDecoration: 'none'  }} type="text" value={subject} onChange={(e) => setSubject(e.target.value)} required  />
            </label>
       

        <label className=" mb-2" style={{ marginLeft: '60px'}}>
          <span className="">Teacher:</span>
          <input  style={{ marginLeft: '20px',backgroundColor:'#EEFEF4',width:'180px',display: 'inline-block', padding: '0.2rem 1rem', textAlign: 'center', borderRadius: '0.25rem', color: 'black', textDecoration: 'none'  }}type="text" value={teacher} onChange={(e) => setTeacher(e.target.value)} required  />
        </label>  
        <br></br>      <br></br><br></br>
        <label className=" mb-2" style={{ marginLeft: '90px'}}>
          <span className="">Hall:</span>
          <input  style={{ marginLeft: '20px',width:'100px',backgroundColor:'#EEFEF4',width:'180px',display: 'inline-block', padding: '0.2rem 1rem', textAlign: 'center', borderRadius: '0.25rem', color: 'black', textDecoration: 'none'  }}type="text" value={hall} onChange={(e) => setHall(e.target.value)} required/>
        </label>
  
    

        <label className=" mb-2" style={{ marginLeft: '60px'}}>
          <span className="">Price:</span>
          <input  style={{ marginLeft: '45px',backgroundColor:'#EEFEF4',width:'180px',display: 'inline-block', padding: '0.2rem 1rem', textAlign: 'center', borderRadius: '0.25rem', color: 'black', textDecoration: 'none'  }}type="number" value={price} onChange={(e) => setPrice(e.target.value)} required  />
        </label>
        
        <label className=" mb-2">
          <span className=""style={{ marginLeft: '40px'}}>Added Date:</span>
          <input style={{ marginLeft: '20px',backgroundColor:'#EEFEF4',width:'180px',display: 'inline-block', padding: '0.2rem 1rem', textAlign: 'center', borderRadius: '0.25rem', color: 'black', textDecoration: 'none'  }} 
          type="date"  value={todayDate} onChange={(e) => setAddedDate(e.target.value)} required />
        </label>
        <br></br>
        <br></br>
        <br></br>
        <label className=" mb-2"style={{ marginLeft: '80px'}}>
          <span className="">Manager ID:</span>
          <input style={{ marginLeft: '40px',backgroundColor:'#EEFEF4',width:'180px',display: 'inline-block', padding: '0.2rem 1rem', textAlign: 'center', borderRadius: '0.25rem', color: 'black', textDecoration: 'none'  }} type="text" value={managerId} onChange={(e) => setManagerId(e.target.value)} required />
        </label>

          
       
   
        <br></br> <br></br><center>
      <button type="submit" className='m-3' style={{ backgroundColor:'#0087FF',width:'180px',display: 'inline-block', padding: '0.2rem 1rem', textAlign: 'center', borderRadius: '0.25rem', color: 'whiite', textDecoration: 'none'  }}>Add Class</button></center>
    </form></div> </div>
  );
};




export default AddClassForm;
