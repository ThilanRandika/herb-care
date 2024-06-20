import React, { useState } from 'react';
import './allBlogs.css';
import { Link } from 'react-router-dom';
import blogImg1 from '../../../Images/blogImages/blog_image1.png';
import blogImg2 from '../../../Images/blogImages/blog_image2.png';
import blogImg3 from '../../../Images/blogImages/blog_image3.png';



const blogs = [
  {
    id: 1,
    date: 'January 16, 2024',
    title: 'Lorem Ipsum Dolor Sit',
    description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Varius Faucibus Placerat.',
    imageUrl: blogImg1
  },
  {
    id: 2,
    date: 'January 16, 2024',
    title: 'Lorem Ipsum Dolor Sit',
    description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Varius Faucibus Placerat.',
    imageUrl: blogImg2
  },
  {
    id: 3,
    date: 'January 16, 2024',
    title: 'Lorem Ipsum Dolor Sit',
    description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Varius Faucibus Placerat.',
    imageUrl: blogImg3
  },
  {
    id: 4,
    date: 'January 16, 2024',
    title: 'Lorem Ipsum Dolor Sit',
    description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Varius Faucibus Placerat.Lorem Ipsum Dolor Sit Amet Consectetur. Varius Faucibus Placerat.Lorem Ipsum Dolor Sit Amet Consectetur. Varius Faucibus Placerat.',
    imageUrl: blogImg1
  },
  {
    id: 5,
    date: 'January 16, 2024',
    title: 'Lorem Ipsum Dolor Sit',
    description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Varius Faucibus Placerat.',
    imageUrl: blogImg2
  },
  {
    id: 1,
    date: 'January 16, 2024',
    title: 'Lorem Ipsum Dolor Sit',
    description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Varius Faucibus Placerat.',
    imageUrl: blogImg3
  },
  {
    id: 2,
    date: 'January 16, 2024',
    title: 'Lorem Ipsum Dolor Sit',
    description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Varius Faucibus Placerat.',
    imageUrl: blogImg1
  },
  {
    id: 3,
    date: 'January 16, 2024',
    title: 'Lorem Ipsum Dolor Sit',
    description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Varius Faucibus Placerat.',
    imageUrl: blogImg2
  },
  {
    id: 4,
    date: 'January 16, 2024',
    title: 'Lorem Ipsum Dolor Sit',
    description: 'https://th.bing.com/th?id=OIP.Z_PIeIRDajXPmZHROt-T_QHaEK&w=333&h=187&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2',
    imageUrl: blogImg3
  },
  {
    id: 5,
    date: 'January 16, 2024',
    title: 'Lorem Ipsum Dolor Sit',
    description: 'Lorem Ipsum Dolor Sit Amet Consectetur. Varius Faucibus Placerat.',
    imageUrl: blogImg1
  }
];

function AllBlogs() {
    const [visibleBlogs, setVisibleBlogs] = useState(6);
  
    const loadMoreBlogs = () => {
      setVisibleBlogs(prevVisibleBlogs => prevVisibleBlogs + 6);
    };
  
    return (
      <div className="all-blogs">
        <header>
          <h3>Lorem Ipsum Dolor Sit</h3>
          <p>Lorem Ipsum Dolor Sit Amet Consectetur Porttitor Varius Placerat.</p>
        </header>
        <div className="blogs-grid">
          {blogs.slice(0, visibleBlogs).map(blog => (
            <Link to={`/blogsHome/oneBlog/${blog.id}`} >
                <div className="blog-card" key={blog.id}>
                <div className="image-container">
                    <img src={blog.imageUrl} alt={blog.title} />
                </div>
                <div className="blog-content">
                    <p className="blog-date">{blog.date}</p>
                    <h3>{blog.title}</h3>
                    <p>{blog.description}</p>
                </div>
                </div>
            </Link>
          ))}
        </div>
        {visibleBlogs < blogs.length && (
          <button className="load-more" onClick={loadMoreBlogs}>Load More</button>
        )}
      </div>
    );
  }

export default AllBlogs;
