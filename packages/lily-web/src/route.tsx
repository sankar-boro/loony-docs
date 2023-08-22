import { Routes, Route } from 'react-router-dom'
import Home from './home'
import Posts from './post'

const RouteComponent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="*" element={<div>Route not found.</div>} />
      </Routes>
    </>
  )
}

export default RouteComponent
