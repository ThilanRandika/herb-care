import React from 'react'
import './categories.css'
import { Link } from 'react-router-dom';

function Categories() {

    const categoriesData = [
        {
          name: 'Skin Care',
          image: 'Home_categories3.png', // Placeholder, replace with actual image paths
        },
        {
          name: 'Body Care',
          image: 'Home_categories2.png',
        },
        {
          name: 'Hair Care',
          image: 'Home_categories1.png',
        }
      ];

  return (
    <div className="categories-list">
        <div className='category-text'>
        <h2>Categories</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae, corrupti?</p>
        </div>
        <div className='category-cards'>
        {categoriesData.map((category, index) => (
          <div className="category-card" key={index}>
            <Link to={'/User_searching'}>
        <img src={require(`../../../Images/home/${category.image}`)} alt={category.name} />
      </Link>
        <h5>{category.name}</h5>
      </div>
      ))}
        </div>
        
    </div>
  )
}

export default Categories