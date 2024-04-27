import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';

const WeekTimetable = () => {
  const [timetableData, setTimetableData] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [gradeFilter, setGradeFilter] = useState('');
  const [teacherFilter, setTeacherFilter] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  
  const [error, setError] = useState(null);
 

  useEffect(() => {
    fetchTimetableData();
  }, []);

  const fetchTimetableData = () => {
    axios.get(`http://localhost:5000/Student/Timetable`)
      .then((res) => {
        console.log("Retrieved timetable data:", res.data); // Log retrieved data
        setTimetableData(res.data);
        setFilteredEvents(res.data); // Set filtered events initially to all events
      })
      .catch((err) => {
        console.error("Error fetching timetable data:", err);
        setError(err);
      });
  };

  useEffect(() => {
    applyFilters();
  }, [gradeFilter, teacherFilter, subjectFilter]);

  const applyFilters = () => {
    let filtered = timetableData.filter(event => {
      let gradeMatch = true;
      let teacherMatch = true;
      let subjectMatch = true;

      if (gradeFilter && event.Grade !== gradeFilter) {
        gradeMatch = false;
      }
      if (teacherFilter && event.Teacher.toLowerCase().indexOf(teacherFilter.toLowerCase()) === -1) {
        teacherMatch = false;
      }
      if (subjectFilter && event.Subject.toLowerCase().indexOf(subjectFilter.toLowerCase()) === -1) {
        subjectMatch = false;
      }

      return gradeMatch && teacherMatch && subjectMatch;
    });

    setFilteredEvents(filtered);
  };

  const localizer = momentLocalizer(moment);

  const getRandomColor = (index) => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div style={{ height: '900px', width: '1000px', position: 'relative' }}>
      {error && <div>Error: {error.message}</div>}
      <div>
        <input
          type="text"
          placeholder="Search by grade"
          value={gradeFilter}
          onChange={(e) => setGradeFilter(e.target.value)}
          className="w-1/3 px-4 py-2 m-4 rounded border border-gray-300 focus:outline-none"
          style={{ backgroundColor:'#EEFEF4',width:'180px',display: 'inline-block', padding: '0.2rem 1rem', textAlign: 'center', borderRadius: '0.25rem', color: 'black', textDecoration: 'none'  }}
        />
        <input
          type="text"
          placeholder="Search by teacher"
          value={teacherFilter}
          onChange={(e) => setTeacherFilter(e.target.value)}
          className="w-1/3 px-4 py-2 m-4 rounded border border-gray-300 focus:outline-none"
          style={{ backgroundColor:'#EEFEF4',width:'180px',display: 'inline-block', padding: '0.2rem 1rem', textAlign: 'center', borderRadius: '0.25rem', color: 'black', textDecoration: 'none'  }}
        />
        <input
          type="text"
          placeholder="Search by subject"
          value={subjectFilter}
          onChange={(e) => setSubjectFilter(e.target.value)}
          className="w-1/3 px-4 py-2 m-4 rounded border border-gray-300 focus:outline-none"
          style={{ backgroundColor:'#EEFEF4',width:'180px',display: 'inline-block', padding: '0.2rem 1rem', textAlign: 'center', borderRadius: '0.25rem', color: 'black', textDecoration: 'none'  }}
        />
      </div>
      <Calendar
        localizer={localizer}
        events={filteredEvents.map((event, index) => ({
          id: event.id,
          title: (
            <div>
              <span>{event.Subject}</span><br />
              <span>{event.Teacher}</span><br />
              <span>{event.Hall}</span>
            </div>
          ),
          start: new Date(event.Date + 'T' + event.Start_time),
          end: new Date(event.Date + 'T' + event.End_Time),
          bgColor: getRandomColor(index) // Assign a unique color to each event
        }))}
        startAccessor="start"
        endAccessor="end"
        
        eventPropGetter={
          (event, start, end, isSelected) => {
            return {
              style: {
                backgroundColor: event.bgColor, // Use the bgColor property for the background color
                color: 'white', // Event text color
                width: '140px',
                height: '140px',
              }
            };
          }
        }
      />
    </div>
  );
}

export default WeekTimetable;
