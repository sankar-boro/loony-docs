import React from 'react'
import { useGetAllPosts } from './api'

type ObjectId = {
  $oid: string
}

type Post = {
  title: string
  _id: ObjectId
}

const HomeComponent = () => {
  const allPosts = useGetAllPosts()
  return (
    <div>
      {allPosts.map((post: Post) => {
        return <div key={post._id.$oid}>{post.title}</div>
      })}
    </div>
  )
}

export default HomeComponent
