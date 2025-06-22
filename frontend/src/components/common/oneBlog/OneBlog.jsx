import React from 'react'
import './oneBlog.css'
import { useParams } from 'react-router-dom';

const blog = {
    id: 1,
    date: 'February 5, 2024',
    title: 'The Power of Turmeric in Daily Wellness',
    description: 'Turmeric, known as the "golden spice" of Ayurveda, has been revered for thousands of years as one of nature\'s most powerful healing compounds. This vibrant yellow root contains curcumin, a potent anti-inflammatory compound that offers remarkable health benefits for modern wellness seekers. In traditional Ayurvedic medicine, turmeric is considered a natural purifier that helps balance all three doshas - Vata, Pitta, and Kapha. Scientific research now validates what ancient practitioners have long known: turmeric supports joint health, promotes healthy digestion, and helps maintain a robust immune system. The bioactive compounds in turmeric work synergistically to reduce inflammation at the cellular level, making it an excellent addition to your daily wellness routine. Whether consumed as a warm golden milk before bedtime, added to cooking, or taken as a standardized supplement, turmeric offers a gentle yet effective approach to maintaining optimal health. For best absorption, combine turmeric with black pepper and a healthy fat like coconut oil or ghee. Start with small amounts and gradually increase as your body adapts to this powerful healing spice.',
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