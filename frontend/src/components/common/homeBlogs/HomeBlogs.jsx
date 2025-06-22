import React from 'react'
import './homeBlogd.css'
import blogImg1 from '../../../Images/blogImages/blog_image1.png';
import blogImg2 from '../../../Images/blogImages/blog_image2.png';
import { Link } from 'react-router-dom';


const blogs = [
    {
      id: 1,
      date: 'February 5, 2024',
      title: 'The Power of Turmeric in Daily Wellness',
      description: 'Discover how this golden spice can transform your health with its powerful anti-inflammatory properties.',
      imageUrl: blogImg1
    },
    {
      id: 2,
      date: 'February 8, 2024',
      title: 'Ashwagandha: Your Natural Stress Relief Solution',
      description: 'Learn how this ancient adaptogen helps your body manage stress and boost energy naturally.',
      imageUrl: blogImg2
    },
];

function HomeBlogs() {
  return (
    <>
    <div className="homeBlogs-all-blogs">
        <header>
          <h3>Wellness Wisdom</h3>
          <p>Explore ancient Ayurvedic knowledge and modern wellness insights to enhance your natural health journey.</p>
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