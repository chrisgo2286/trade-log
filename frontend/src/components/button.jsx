import React, { useState } from 'react';
import '../styles/button.css';

export default function Button(props) {
    const [buttonHovered, setButtonHovered] = useState(false);
  
    function toggleHover () {
      setButtonHovered(!buttonHovered);
    }
  
    function handleClass () {
      return (buttonHovered) ? 'btn hover': 'btn';
    }
  
    return (
      <span
        className={ handleClass() }
        onMouseEnter={ toggleHover } 
        onMouseLeave={ toggleHover }
        onClick={ props.onClick }>
        { props.children }
      </span>
    )
  }