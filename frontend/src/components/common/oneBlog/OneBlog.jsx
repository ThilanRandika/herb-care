import React from 'react'
import './oneBlog.css'
import { useParams } from 'react-router-dom';

const blog = {
    id: 1,
    date: 'January 16, 2024',
    title: 'Lorem Ipsum Dolor Sit',
    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor velit beatae, animi a quo doloribus explicabo magnam eius atque, voluptates soluta voluptas? At ipsum voluptatibus earum voluptate animi itaque sit cumque ut assumenda aut, esse soluta ratione. Voluptates dolores at harum enim, reiciendis corrupti aspernatur blanditiis expedita amet veritatis doloribus adipisci rerum inventore dolorem. Assumenda, doloremque consectetur quo atque iure minus alias maiores quod deserunt accusantium quibusdam? Laborum quasi quod officiis repellat esse possimus porro maxime. Illum accusamus illo, facere hic itaque iure rem odio nemo in rerum ad sint architecto minus, ut quasi ullam fuga quo reprehenderit deserunt aperiam.',
    imageUrl: 'https://th.bing.com/th?id=OIP.qDvAlhidTBzXiGyDfq_O0gHaE7&w=306&h=204&c=8&rs=1&qlt=90&o=6&dpr=1.1&pid=3.1&rm=2'
  }

function OneBlog() {
    
    const { blogId } = useParams();
    console.log(blogId)

  return (
    <>
    <div className='oneblog-container'>
        <div className='oneblog-upper-container'>
            <div className='oneblog-title-container'>
                <h2>{blog.title}</h2>
                <p>{blog.date}</p>
            </div>
            <div className='oneblog-image-container'>
                <img src={blog.imageUrl} alt={blog.title} />
            </div>
            <div className='oneblog-description-container'>
                <p>{blog.description}</p>
            </div>
        </div>
        <div className='oneblog-lower-container'>
            
        </div>
    </div>
    </>
  )
}

export default OneBlog