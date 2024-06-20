import React from 'react'
import AllBlogs from '../../../../components/common/Blogs/AllBlogs'
import Header from '../../../../components/common/header/header'
import Footer from '../../../../components/common/footer/footer';
import { Route, Routes } from 'react-router-dom';
import SingleBlogPage from '../sigleBlog/SingleBlogPage';

function AllBlogsPage() {
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
        <AllBlogs/>
    <Footer/>

    <Routes>
        <Route path="/oneBlog/:blogId" element={< SingleBlogPage/>} />
    </Routes>
    </>
  )
}

export default AllBlogsPage