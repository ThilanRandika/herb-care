import React from 'react'
import './categories.css'

function Categories() {

    const categoriesData = [
        {
          name: 'Skin Care',
          image: 'https://th.bing.com/th/id/OIP.hzwtk7xoNaGH3yQAhWhJIwHaJQ?w=146&h=181&c=7&r=0&o=5&dpr=1.1&pid=1.7', // Placeholder, replace with actual image paths
        },
        {
          name: 'Body Care',
          image: 'https://th.bing.com/th/id/OIP.qDvAlhidTBzXiGyDfq_O0gHaE7?w=234&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7',
        },
        {
          name: 'Hair Care',
          image: 'https://th.bing.com/th/id/OIP.zOyMKTQXccv6qNHPfoqLrQHaEK?w=291&h=180&c=7&r=0&o=5&dpr=1.1&pid=1.7',
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
        <img src={category.image} alt={category.name} />
        <h5>{category.name}</h5>
      </div>
      ))}
        </div>
        
    </div>
  )
}

export default Categories