import React, { useState } from 'react'
import NavbarComponent from './navbar'

const CreateComponent = () => {
  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')
  const [groupName, setNewGroupName] = useState('')

  const update = () => {
    fetch(`http://localhost:8080/add_post`, {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        title: newTitle,
        body: newBody,
        group: groupName,
        user_id: '64e44ea33de0fc32e21a3acb',
      }),
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
            placeholder="title"
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div>
          <textarea
            placeholder="body"
            onChange={(e) => setNewBody(e.target.value)}
          >
            {newBody}
          </textarea>
        </div>
        <div>
          <input
            value={groupName}
            placeholder="group"
            onChange={(e) => setNewGroupName(e.target.value)}
          />
        </div>
        <button onClick={update}>Update</button>
      </div>
    </div>
  )
}

export default CreateComponent
