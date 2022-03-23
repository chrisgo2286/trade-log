import React, { useState } from 'react';

export default function Button(props) {
    const [buttonHovered, setButtonHovered] = useState(false);
  
    function toggleHover () {
      setButtonHovered(!buttonHovered);
    }
  
    function handleClass () {
      return (buttonHovered) ? 'hover': '';
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