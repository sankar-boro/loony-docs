import React, { useState } from 'react'
import { useGetAllPosts } from './api'
import { Post } from './types'
import { Menu } from './icons'

const Card = ({ post }: { post: Post }) => {
  const deletePost = () => {
    fetch(`http://localhost:8080/delete_post/${post._id.$oid}`, {
      method: 'POST',
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
      })
  }

  const [view, setView] = useState(false)
  return (
    <div className="card">
      <div className="card-header">
        <div key={post._id.$oid} className="card-title">
          {post.title}
        </div>
        <div className="card-settings">
          <div
            onClick={() => {
              setView(!view)
            }}
          >
            <Menu />
          </div>
          {view ? (
            <div className="card-menu">
              <div className="li-item">Edit</div>
              <div className="li-item" onClick={deletePost}>
                Delete
              </div>
            </div>
          ) : null}
        </div>
      </div>
      <div key={post._id.$oid} className="card-body">
        {post.body}
      </div>
    </div>
  )
}

const PostComponent = () => {
  const allPosts = useGetAllPosts()
  return (
    <div>
      {allPosts.map((post: Post) => {
        return <Card post={post} />
      })}
    </div>
  )
}

export default PostComponent
