import React from 'react'
import NavbarComponent from './navbar'
import PostComponent from './post'

const HomeComponent = () => {
  return (
    <div className="con-100">
      <NavbarComponent />
      <div className="con-75">
        <PostComponent />
      </div>
    </div>
  )
}

export default HomeComponent
