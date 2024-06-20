import React from 'react'
import { Route, Routes } from 'react-router-dom';
import AllBlogsPage from './AllBlogs/AllBlogsPage';
import SingleBlogPage from './sigleBlog/SingleBlogPage';

function BlogsPage() {
  return (
    <>
    <Routes>
        <Route path="/blogs" element={< AllBlogsPage/>} />
        <Route path="/oneBlog/:blogId" element={< SingleBlogPage/>} />
    </Routes>
    </>
  )
}

export default BlogsPage