import React, { useState, useEffect,useRef  } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import 'tailwindcss/tailwind.css';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import ManagerNavBar from './ManagerNavBar';


function ManagerTimetable  (){
  
  const [timetableData, setTimetableData] = useState([]);
  const [searchGrade, setSearchGrade] = useState('');
  
  
  const [searchDate, setSearchDate] = useState('');
  const [searchTeacher, setSearchTeacher] = useState('');
  const [searchSubject, setSearchSubject] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');

  const isPastDate = (dateString) => {
    const currentDate = new Date().toISOString().split('T')[0];
    return dateString < currentDate;
  };
 
  const teacherCounts = {};

  // Count classes per teacher for the selected month
  const filteredData = timetableData.filter(item => item.Date.includes(`-${selectedMonth}-`));
  filteredData.forEach((item) => {
    if (!teacherCounts[item.Teacher]) {
      teacherCounts[item.Teacher] = 0;
    }
    teacherCounts[item.Teacher]++;
  });

  
  const generatePDF = () => {
    const pdf = new jsPDF();
    const filteredData = timetableData.filter(item => item.Date.includes(`-${selectedMonth}-`));

    // Sort filtered data by date
    filteredData.sort((a, b) => new Date(a.Date) - new Date(b.Date));

    const tableData = filteredData.map((item) => [
      item.Date,
      item.Class_ID,
      item.Teacher,
      item.Grade,
      item.Subject,
      item.Start_time,
      item.End_Time,
      item.Hall,
      item.Price,
    ]);

    pdf.autoTable({
      head: [['Date', 'Class_ID','Teacher', 'Grade', 'Subject', 'Start Time', 'End Time', 'Hall', 'Price']],
      body: tableData,
    });
 // Add teacher class counts
 let y = pdf.autoTable.previous.finalY + 10;
 pdf.setFontSize(12);
 pdf.text(10, y, 'Teacher Class Counts:');
 y += 10;

 Object.keys(teacherCounts).forEach((teacher) => {
   pdf.text(20, y, `${teacher}: ${teacherCounts[teacher]}`);
   y += 10;
 });
    pdf.output('dataurlnewwindow');
  };
// you can use pdf.output('dataurlnewwindow');
  useEffect(() => {
    fetchTimetableData();
  }, []);

  const fetchTimetableData = () => {
    axios.get(`http://localhost:5000/Manager/Timetable?grade=${searchGrade}||teacher=${searchTeacher}||subject=${searchSubject}`)
      .then((res) => {
        setTimetableData(res.data);
        setFilteredEvents(res.data);
      })
      .catch((err) => console.error(err));
  };
  useEffect(() => {
    const filteredData = timetableData.filter(item => {
      return (
        item.Date.toLowerCase().includes(searchDate.toLowerCase()) &&
        item.Teacher.toLowerCase().includes(searchTeacher.toLowerCase()) &&
        item.Subject.toLowerCase().includes(searchSubject.toLowerCase())
      );
    });
    setFilteredEvents(filteredData);
  }, [searchDate, searchTeacher, searchSubject, timetableData]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/Manager/DeleteTimetable/${id}`)
      .then((res) => {
        
        window.location.reload();
       
      })
      .catch((err) => console.error(err));
  };

  const confirmDelete = (itemId) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      handleDelete(itemId);
    }
  };

  const months = [
    { value: '01', name: 'January' },
    { value: '02', name: 'February' },
    { value: '03', name: 'March' },
    { value: '04', name: 'April' },
    { value: '05', name: 'May' },
    { value: '06', name: 'June' },
    { value: '07', name: 'July' },
    { value: '08', name: 'August' },
    { value: '09', name: 'September' },
    { value: '10', name: 'October' },
    { value: '11', name: 'November' },
    { value: '12', name: 'December' },
  ];
  return (
    <div className="mt-4">
      <ManagerNavBar/>
      <h2 className="text-lg font-bold mb-2">Timetable Data</h2>
      
      <div className="w-full ml-8 "style={{ float: 'left',marginLeft:'500px' }}>
      <input type="date" placeholder="Search by Date" value={searchDate} onChange={(e) => setSearchDate(e.target.value)} className="w-1/3 px-4 py-2 m-4 rounded border border-gray-300 focus:outline-none"
          style={{ backgroundColor:'#EEFEF4',width:'180px',display: 'inline-block', padding: '0.2rem 1rem', textAlign: 'center', borderRadius: '0.25rem', color: 'black', textDecoration: 'none'  }}/>
        <input type="text" placeholder="Search by Teacher" value={searchTeacher} onChange={(e) => setSearchTeacher(e.target.value)} className="w-1/3 px-4 py-2 m-4 rounded border border-gray-300 focus:outline-none"
          style={{ backgroundColor:'#EEFEF4',width:'180px',display: 'inline-block', padding: '0.2rem 1rem', textAlign: 'center', borderRadius: '0.25rem', color: 'black', textDecoration: 'none'  }} />
        <input type="text" placeholder="Search by Subject" value={searchSubject} onChange={(e) => setSearchSubject(e.target.value)} className="w-1/3 px-4 py-2 m-4 rounded border border-gray-300 focus:outline-none"
          style={{ backgroundColor:'#EEFEF4',width:'180px',display: 'inline-block', padding: '0.2rem 1rem', textAlign: 'center', borderRadius: '0.25rem', color: 'black', textDecoration: 'none'  }} />
      <Link className='' to={'/Manager/AddnewClasstime'} style={{ backgroundColor: '#0993FF', width: '180px',height:'30px', display: 'inline-block', padding: '0.2rem 1rem', textAlign: 'center', borderRadius: '0.25rem', color: 'white', textDecoration: 'none',marginLeft:'140px' }}>
        Add New Class Time
      </Link>
      </div>
      <div>
      <table style={{ width: '1100px', marginLeft:'300px'}} >
        <thead >
          <tr >
          <th className='p-2 bg-slate-400' style={{ width: '100px'}}>Manager</th>
      <th className='p-2 bg-slate-400' style={{ width: '180px' }}>Added Date</th>
      <th className='p-2  bg-slate-400' style={{ width: '180px' }}>Date</th>
      <th className='p-2  bg-slate-400' style={{ width: '180px' }}>Class_ID</th>
      <th className='p-2 bg-slate-400' style={{ width: '180px' }}>Start Time</th>
      <th className='p-2 bg-slate-400' style={{ width: '150px' }}>End Time</th>
      <th className='p-2 bg-slate-400' style={{ width: '100px' }}>Grade</th>
      <th className='p-2 bg-slate-400' style={{ width: '120px' }}>Subject</th>
      <th className='p-2 bg-slate-400' style={{ width: '240px' }}>Teacher</th>
      <th className='p-2 bg-slate-400' style={{ width: '80px' }}>Hall</th>
      <th className='p-2 bg-slate-400' style={{ width: '80px' }}>Price</th>
      <th className='p-2 bg-slate-400' style={{ width: '270px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
         {filteredEvents.map((item)  => (
  <tr key={item._id} style={{ backgroundColor:'#EEFEFF'}}>
    <td className='p-2 m-2' style={{ width: '100px' }}>{item.Manager_ID}</td>
    <td className='p-2 m-2' style={{ width: '180px' }}>{item.Added_Date}</td>
    <td className='p-2 m-2' style={{ width: '180px' }}>{item.Date}</td>
    <td className='p-2 m-2' style={{ width: '100px' }}>{item.Class_ID}</td>
    <td className='p-2 m-2' style={{ width: '180px' }}>{item.Start_time}</td>
    <td  className='p-2 m-2' style={{ width: '150px' }}>{item.End_Time}</td>
    <td className='p-2 m-2' style={{ width: '100px' }}>{item.Grade}</td>
    <td className='p-2 m-2' style={{ width: '120px' }}>{item.Subject}</td>
    <td className='p-2 m-2' style={{ width: '150px' }}>{item.Teacher}</td>
    <td className='p-2 m-2' style={{ width: '100px' }}>{item.Hall}</td>
    <td className='p-2 m-2' style={{ width: '100px' }}>{item.Price}</td>
    
    
    <td className='p-2 ' style={{ width: '300px' }} >
                <Link to={`/Manager/UpdateTimetable/${item._id}`} style={{ backgroundColor: '#3ED174', width: '60px', display: 'inline-block', padding: '0.2rem 1rem', textAlign: 'center', borderRadius: '0.25rem', color: 'white', textDecoration: 'none' }} >
                  Edit
                </Link>
                <button className='m-3' style={{ backgroundColor: isPastDate(item.Date) ? '#CCCCCC' : '#FF0000', width: '70px', display: 'inline-block', padding: '0.2rem 1rem', textAlign: 'center', borderRadius: '0.25rem', color: 'white', textDecoration: 'none', opacity: isPastDate(item.Date) ? '0.5' : '1' }}  
                 onClick={(e) => isPastDate(item.Date) ? e.preventDefault() : confirmDelete(item._id)}
                 disabled={isPastDate(item.Date)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table></div>
      <div className="mt-4" >
      <div className="mb-4" style={{ width: '1100px', marginLeft:'300px'}}>
        <label htmlFor="month" className="mr-2">Select Month:</label>
        <select id="month" value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)} className="px-4 py-2 rounded border border-gray-300 focus:outline-none">
          <option value="">--Select Month--</option>
          {/* Loop over months array to generate options */}
          {months.map((month, index) => (
            <option key={index} value={month.value}>{month.name}</option>
          ))}
        </select>
      </div>

      <button onClick={generatePDF} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"style={{ width: '1100px', marginLeft:'300px'}}>
        Generate PDF
      </button>
    </div>
    </div>
  );
};

export default ManagerTimetable;

