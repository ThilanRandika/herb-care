import React from 'react';
import AddComplaints from '../../../components/Feedback&Complaints/Complaints/Add/AddComplaints';
import Header from '../../../components/common/header/header';
import Footer from '../../../components/common/footer/footer';

function Complaints_Dashboard() {
  return (
    <div>
        <Header></Header>
        <AddComplaints/>
        <Footer></Footer>
    </div>
  )
}

export default Complaints_Dashboard