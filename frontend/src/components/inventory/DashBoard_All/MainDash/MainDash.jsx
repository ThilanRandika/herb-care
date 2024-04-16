import React from 'react'
import {useState} from "react";

function MainDash() {

      const [image,setImage]= useState();

      const onInputChange =(e) => {
        console.log(e.target.files[0]);
        setImage(e.target.files[0]);
      };

  return (
    <div>
        <form>
          <input type="file" accept="image/*" onChange={onInputChange}></input>
          <button type='submit'>Submit</button>
        </form>

    </div>
  )
}

export default MainDash