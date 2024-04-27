import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ManagerUpdateTimetable() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        Date: '',
        Class_ID: '',
        Start_time: '',
        End_Time: '',
        Grade: '',
        Subject: '',
        Teacher: '',
        Hall: '',
        Price: '',
        Manager_ID: '',
        Added_Date: '',
    });

    const { Date, Class_ID, Start_time, End_Time, Grade, Subject, Teacher, Hall, Price, Manager_ID, Added_Date } = formData;
    const navigate = useNavigate();

    useEffect(() => {
      axios.get(`http://localhost:5000/Manager/Timetable/${id}`)
          .then((res) => {
              setFormData(res.data);
          })
          .catch((error) => {
              console.error('Error fetching data:', error);
          });
  }, [id]);

  const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDateChange = (e) => {
      const selectedDate = e.target.value;
      const currentDate = new Date().toISOString().split('T')[0];
      setFormData({ ...formData, Date: selectedDate, Added_Date: currentDate });

      // Set start time as current time if date is current date
      const isCurrentDate = selectedDate === currentDate;
      const currentHour = new Date().getHours();
      const currentMinute = new Date().getMinutes();
      const currentTime = `${currentHour}:${currentMinute}`;
      setFormData({ ...formData, Start_time: isCurrentDate ? currentTime : '', End_Time: '' });
  };

  const handleStartTimeChange = (e) => {
      const selectedStartTime = e.target.value;
      setFormData({ ...formData, Start_time: selectedStartTime });
     
    if (!End_Time || selectedStartTime > End_Time) {
      setFormData({ ...formData, Start_time:  selectedStartTime});
    }
      // Your logic for handling start time change goes here
  };

  const handleEndTimeChange = (e) => {
      const selectedEndTime = e.target.value;
      setFormData({ ...formData, End_Time: selectedEndTime });

      // Your logic for handling end time change goes here
  };

  const update = (e) => {
      e.preventDefault();
      axios.put(`http://localhost:5000/Manager/UpdateT/${id}`, formData)
          .then(res => {
              navigate('/Manager/Timetable');
          })
          .catch((error) => {
              console.error('Error updating data:', error);
          });
  };

    return (
        <div className="container">
            <h1 className="center-align">Update Timetable</h1>
            <div className="row">
                <form className="col s12" onSubmit={update}>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="date" type="date" className="validate" name="Date" value={Date} onChange={handleDateChange} />
                            <label htmlFor="date">Date</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="class_id" type="text" className="validate" name="Class_ID" value={Class_ID} onChange={handleInputChange} />
                            <label htmlFor="class_id">Class ID</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="start_time" type="time" className="validate" name="Start_time" value={Start_time} onChange={handleStartTimeChange} />
                            <label htmlFor="start_time">Start Time</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="end_time" type="time" className="validate" name="End_Time" value={End_Time} onChange={handleEndTimeChange} />
                            <label htmlFor="end_time">End Time</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="grade" type="text" className="validate" name="Grade" value={Grade} onChange={handleInputChange} />
                            <label htmlFor="grade">Grade</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="subject" type="text" className="validate" name="Subject" value={Subject} onChange={handleInputChange} />
                            <label htmlFor="subject">Subject</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="teacher" type="text" className="validate" name="Teacher" value={Teacher} onChange={handleInputChange} />
                            <label htmlFor="teacher">Teacher</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="hall" type="text" className="validate" name="Hall" value={Hall} onChange={handleInputChange} />
                            <label htmlFor="hall">Hall</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="price" type="number" className="validate" name="Price" value={Price} onChange={handleInputChange} />
                            <label htmlFor="price">Price</label>
                        </div>
                        <div className="input-field col s6">
                            <input id="manager_id" type="text" className="validate" name="Manager_ID" value={Manager_ID} onChange={handleInputChange} />
                            <label htmlFor="manager_id">Manager ID</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s6">
                            <input id="added_date" type="date" className="validate" name="Added_Date" value={Added_Date} onChange={handleInputChange} />
                            <label htmlFor="added_date">Added Date</label>
                        </div>
                    </div>
                    <div className="row">
                        <div className="input-field col s12">
                            <button className="btn waves-effect waves-light" type="submit" name="action">Update
                                
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ManagerUpdateTimetable;
