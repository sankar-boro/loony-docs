import { useEffect, useState } from 'react'

export const useGetAllPosts = () => {
  const [data, setData] = useState([])
  useEffect(() => {
    fetch('http://localhost:8080/get_posts')
      .then((res) => res.json())
      .then((res) => {
        setData(res)
      })
  }, [])
  return data
}
