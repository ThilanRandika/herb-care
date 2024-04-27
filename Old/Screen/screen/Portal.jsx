import React from 'react'
import '../Portal.css';


function portal() {
  return (    
    <main class="bg">
      <div class="portal" >      
        <p class="royal"><b>ROYAL ACADEMY</b></p>
        <p class="slogan">Educate. Elevate. Empower.</p>      
        <p class="introtext">Welcome to Royal Academy, an esteemed institution dedicated to fostering academic excellence, nurturing creativity, and shaping the leaders of tomorrow. At Royal Academy, we believe in the transformative power of education, providing a dynamic and inclusive environment where students embark on a journey of discovery and growth. Our commitment to excellence is reflected in our experienced faculty, innovative teaching methodologies, and a comprehensive curriculum designed to prepare students for success in an ever-evolving world. As a hub of learning, Royal Academy is not just a school; it's a community that values curiosity, integrity, and a passion for knowledge. Join us on a transformative educational adventure where every student's potential is recognized and nurtured, paving the way for a brighter future."</p>
        <a href='/login'><button class="joinbtn">Join</button></a>
        <a href='/teacherlogin'><p class="teacher"><u>Login as Teacher</u></p></a>
      </div>
    </main>
  )
}

export default portal
