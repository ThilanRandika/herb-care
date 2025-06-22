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
    title: 'Turmeric: The Golden Spice of Ayurveda',
    description: 'Discover the incredible healing properties of turmeric and how this ancient spice can transform your health naturally.',
    imageUrl: blogImg1
  },
  {
    id: 2,
    date: 'January 18, 2024',
    title: 'Understanding Your Dosha Type',
    description: 'Learn about the three doshas - Vata, Pitta, and Kapha - and how balancing them can optimize your wellbeing.',
    imageUrl: blogImg2
  },
  {
    id: 3,
    date: 'January 20, 2024',
    title: 'Ashwagandha for Stress Relief',
    description: 'Explore how this powerful adaptogenic herb helps combat stress and promotes natural energy balance.',
    imageUrl: blogImg3
  },
  {
    id: 4,
    date: 'January 22, 2024',
    title: 'Morning Rituals for Ayurvedic Living',
    description: 'Start your day the Ayurvedic way with these simple yet powerful morning practices that align your body and mind with nature\'s rhythms for optimal health and vitality.',
    imageUrl: blogImg1
  },
  {
    id: 5,
    date: 'January 24, 2024',
    title: 'Triphala: The Three-Fruit Wonder',
    description: 'Uncover the digestive benefits of this traditional Ayurvedic formula made from three sacred fruits.',
    imageUrl: blogImg2
  },
  {
    id: 6,
    date: 'January 26, 2024',
    title: 'Neem: Nature\'s Purifier',
    description: 'Learn about neem\'s powerful detoxifying properties and its role in maintaining healthy skin and immunity.',
    imageUrl: blogImg3
  },
  {
    id: 7,
    date: 'January 28, 2024',
    title: 'Ayurvedic Diet for Modern Life',
    description: 'Simple guidelines for incorporating Ayurvedic eating principles into your busy contemporary lifestyle.',
    imageUrl: blogImg1
  },
  {
    id: 8,
    date: 'January 30, 2024',
    title: 'Meditation and Mindfulness in Ayurveda',
    description: 'Discover how ancient meditation practices complement herbal remedies for complete mind-body wellness.',
    imageUrl: blogImg2
  },
  {
    id: 9,
    date: 'February 2, 2024',
    title: 'Seasonal Cleansing with Herbs',
    description: 'Learn about traditional Ayurvedic detox methods using specific herbs for each season of the year.',
    imageUrl: blogImg3
  },
  {
    id: 10,
    date: 'February 4, 2024',
    title: 'Holy Basil: Sacred Healing Plant',
    description: 'Explore the spiritual and medicinal significance of Tulsi in Ayurvedic tradition and modern wellness.',
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
          <h3>Ayurvedic Wisdom & Wellness</h3>
          <p>Explore ancient healing knowledge, herbal remedies, and holistic wellness practices for modern living.</p>
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
          <button className="load-more">Load More</button>
        )}
      </div>
    );
  }

export default AllBlogs;