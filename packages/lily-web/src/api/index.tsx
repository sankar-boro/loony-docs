import { useEffect, useState } from 'react'

export const useGetAllPosts = (activeView: string) => {
  const [data, setData] = useState([])
  useEffect(() => {
    if (activeView) {
      fetch(`http://localhost:8080/get_posts/withGroupName/${activeView}`)
        .then((res) => res.json())
        .then((res) => {
          setData(res)
        })
    }
  }, [activeView])
  return data
}

export const useGetAllGroups = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('http://localhost:8080/get_groups')
      .then((res) => res.json())
      .then((res) => {
        setData(res)
      })
  }, [])
  return data
}
