import { Routes, Route } from 'react-router-dom'
import Home from './home'
import Posts from './post'
import EditComponent from './edit'
import CreateGroupComponent from './forms/createGroup'
import CreateComponent from './create'

const RouteComponent = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/edit" element={<EditComponent />} />
        <Route path="/create" element={<CreateComponent />} />
        <Route path="/createGroup" element={<CreateGroupComponent />} />

        <Route path="*" element={<div>Route not found.</div>} />
      </Routes>
    </>
  )
}

export default RouteComponent
