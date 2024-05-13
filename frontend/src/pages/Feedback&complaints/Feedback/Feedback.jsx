import React from 'react';
import AddFeedback from '../../../components/Feedback&Complaints/Feedback/Add/AddFeedback';
import Header from '../../../components/common/header/header';
import Footer from '../../../components/common/footer/footer';

function Feedback_Dashboard() {
  return (
    <div>
        <Header></Header>
        <AddFeedback/>
        <Footer></Footer>
    </div>
  )
}

export default Feedback_Dashboard