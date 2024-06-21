import React from 'react'
import './homeBlogd.css'
import blogImg1 from '../../../Images/blogImages/blog_image1.png';
import blogImg2 from '../../../Images/blogImages/blog_image2.png';
import { Link } from 'react-router-dom';


const blogs = [
    {
      id: 1,
      date: 'January 16, 2024',
      title: 'Lorem Ipsum Dolor Sit Sit Amet ',
      description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Varius Faucibus Placerat.',
      imageUrl: blogImg1
    },
    {
      id: 2,
      date: 'January 16, 2024',
      title: 'Lorem Ipsum Dolor Sit Sit Amet Consectetur',
      description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Varius Faucibus Placerat.',
      imageUrl: blogImg2
    },
];

function HomeBlogs() {
  return (
    <>
    <div className="homeBlogs-all-blogs">
        <header>
          <h3>Our Blogs</h3>
          <p>Lorem Ipsum Dolor Sit Amet Consectetur Porttitor Varius Placerat.</p>
        </header>
        <div className="homeBlogs-blogs-grid">
          {blogs.map(blog => (
            <Link to={`/blogsHome/oneBlog/${blog.id}`} >
                <div className="homeBlogs-blog-card" key={blog.id}>
                <div className="homeBlogs-image-container">
                    <img src={blog.imageUrl} alt={blog.title} />
                </div>
                <div className="homeBlogs-blog-content">
                    <p className="homeBlogs-blog-date">{blog.date}</p>
                    <h4>{blog.title}</h4>
                </div>
                </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default HomeBlogs