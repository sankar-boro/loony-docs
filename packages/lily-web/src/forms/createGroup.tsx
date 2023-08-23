import React, { useState } from 'react'
import NavbarComponent from '../navbar'

const CreateGroupComponent = () => {
  const [groupName, setGroupName] = useState('')

  const create = () => {
    console.log(groupName)
    if (groupName) {
      fetch(`http://localhost:8080/add_group`, {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ name: groupName }),
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res)
        })
    }
  }
  return (
    <div className="con-100">
      <NavbarComponent />
      <div className="con-75">
        <div>Create Group</div>
        <div>
          <input
            value={groupName}
            placeholder="Group name"
            onChange={(e) => {
              e.preventDefault()
              setGroupName(e.target.value)
            }}
          />
        </div>
        <button onClick={create}>Create</button>
      </div>
    </div>
  )
}

export default CreateGroupComponent
