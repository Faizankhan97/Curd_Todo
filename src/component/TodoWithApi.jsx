import React, {useEffect, useState } from 'react'
import axios from 'axios'

const TodoWithApi = () => {
  const [isInput, setIsInput] = useState("")
  const [isSearch, setIsSearch] = useState("")
  const [idCounter, setIdCounter] = useState(1)
  const [isData, setIsData] = useState(() => {
    const storageList = localStorage.getItem("isData")
    return storageList ? JSON.parse(storageList) : []
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = {
      id: idCounter,
      title: isInput,
    }
    try {
      const response = await axios.post("https://jsonplaceholder.typicode.com/posts", payload)
      const newItem = {
        id: response?.data?.id, 
        name: response?.data?.title
      };
      setIsData([...isData, newItem]);
      setIdCounter(idCounter + 1);
      setIsInput("")
    } catch (error) {
      console.log(error, "error")
    }

  }

  const fetchData = async () => {
    const response = await axios.get("https://jsonplaceholder.typicode.com/users")
    try {
      setIsData(response?.data)
      console.log(response?.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = (e) => {
    setIsSearch(e.target.value)
  }

  const searchFilter = isData?.filter((item) => item?.name?.toLowerCase()?.includes(isSearch?.toLowerCase())) 

  useEffect(() => {
    fetchData();
  }, [])

  useEffect(() => {
    localStorage.setItem("isData", JSON.stringify(isData))
  }, [])
  

  return (
    <>
      <input type="text" onChange={(e) => setIsInput(e.target.value)} value={isInput} placeholder='Type here'/>  
      <input type="text" onChange={handleSearch} placeholder='Search' value={isSearch}/>  
      <button onClick={handleSubmit}>Submit</button>
      <ul>
        {searchFilter?.map((items) => (
          <li key={items?.id}>{items?.name}</li>
        ))}
      </ul>
    </>
  )
}

export default TodoWithApi