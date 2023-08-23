import React from 'react'
import { useGetAllGroups } from './api'
import { Group } from './types'

const Card = ({
  group,
  setActiveView,
}: {
  group: Group
  setActiveView: any
}) => {
  return (
    <div
      className="card"
      onClick={() => {
        setActiveView(group.name)
      }}
    >
      <div className="card-body">{group.name}</div>
    </div>
  )
}

const GroupComponent = ({ setActiveView }: any) => {
  const allGroups = useGetAllGroups()
  return (
    <div>
      {allGroups.map((group: Group) => {
        return <Card group={group} setActiveView={setActiveView} />
      })}
    </div>
  )
}

export default GroupComponent
