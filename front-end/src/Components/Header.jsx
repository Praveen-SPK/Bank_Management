import React from 'react'
import '../Styles/Header.css';
import image from '../Images/undraw_pic-profile_nr49.svg';

export default function Header() {
  
  return (
    <>
        <div className='header-section'>
          <h2>
            Bank Management System
          </h2>
          
          <div className='profile'>
            <div className='profile-img'>
              <img src={image} alt='image'></img>
            </div>
            <h4>
              Barath
            </h4>
          </div>
        </div>    
    
    </>
  )
}
