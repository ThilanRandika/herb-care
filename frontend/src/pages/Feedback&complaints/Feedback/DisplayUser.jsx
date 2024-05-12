import React from 'react'
import UserDisplay from '../../../components/Feedback&Complaints/Feedback/Display/DisplayUser/UserDisplay';
import Header from '../../../components/common/header/header';
import Footer from '../../../components/common/footer/footer';

function Display_user() {
  return (
    <div>
        <Header></Header>
        <UserDisplay/>
        <Footer></Footer>
    </div>
  )
}

export default Display_user