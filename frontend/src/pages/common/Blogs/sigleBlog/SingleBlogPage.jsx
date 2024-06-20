import React from 'react'
import Header from '../../../../components/common/header/header'
import Footer from '../../../../components/common/footer/footer'
import OneBlog from '../../../../components/common/oneBlog/OneBlog'

function SingleBlogPage() {
  return (
    <>
    <Header/>
    <br />
    <br />
    <div className="GiftPack_display_header_card">
        <h1 className="GiftPack_display_header">Our Blogs</h1>
        <h5 className="GiftPack_display_header">Lorem ipsum dolor sit amet consectetur.</h5>
        <p className="GiftPack_display_header">Quick  -  Easy  -  The best</p>
        <p className="GiftPack_display_header">From Us</p>
    </div>
        <OneBlog/>
    <Footer/>
    </>
  )
}

export default SingleBlogPage