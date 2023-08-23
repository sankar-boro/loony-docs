import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import NavbarComponent from './navbar'

const EditComponent = () => {
  const data = useLocation()
  const { title, body, _id } = data.state
  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')

  useEffect(() => {
    setNewTitle(title)
    setNewBody(body)
  }, [])

  const update = () => {
    fetch(`http://localhost:8080/update_post`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ title: newTitle, body: newBody, _id: _id.$oid }),
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res)
      })
  }
  return (
    <div className="con-100">
      <NavbarComponent />
      <div className="con-75">
        <div>
          <input
            value={newTitle}
            placeholder="edit"
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div>
          <input
            value={newBody}
            placeholder="edit"
            onChange={(e) => setNewBody(e.target.value)}
          />
        </div>
        <button onClick={update}>Update</button>
      </div>
    </div>
  )
}

export default EditComponent
