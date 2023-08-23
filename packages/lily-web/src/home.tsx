import React, { useState } from 'react'
import NavbarComponent from './navbar'
import PostComponent from './post'
import GroupComponent from './group'

const HomeComponent = () => {
  const [activeView, setActiveView] = useState('')
  return (
    <div className="con-100">
      <NavbarComponent />
      <div className="con-75">
        <GroupComponent setActiveView={setActiveView} />
        <PostComponent activeView={activeView} />
      </div>
    </div>
  )
}

export default HomeComponent
