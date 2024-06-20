import React from 'react'
import Header from '../../../components/common/header/header'
import Footer from '../../../components/common/footer/footer'
import PartnershipRequest from '../../../components/sellerPartnership/partnershipRequest/PartnershipRequest'
import './sellerRegistrationPage.css'
import { Link } from 'react-router-dom'

function SellerRegistrationPage() {
  return (
    <>
    <Header/>
    <br />
    
    <Link to="/" >
      <button class="seller-request-back"><i class="fa fa-arrow-left">  </i>  Back To Home</button>
      </Link>
        <PartnershipRequest/>
    <Footer/>
    </>
  )
}

export default SellerRegistrationPage