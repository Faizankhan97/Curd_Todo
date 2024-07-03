import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [updatedValue, setUpdatedValue] = useState()
  const [list, setList] = useState(() => {
    const storageList = localStorage.getItem("list")
    return storageList ? JSON.parse(storageList) : [];
  });

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list))
    console.log(list, "list")
  }, [list])


  const handleInput = (e) => {
    setInput(e.target.value)
  }

  const handleSubmit = () => {
    setList([...list, { input, id: Math.random() }])
    setInput("")
  }

  const handleDelete = (id) => {
    setList(list.filter((item) => item?.id != id))
  }

  const handleUpdate = (newValue) => {
    setUpdatedValue(newValue)
    setInput(newValue?.input);
    setIsUpdate(true)
  }

  const handleUpdateFunc = () => {
    setList(list?.map((item) => {
      if(item?.id == updatedValue?.id){
        return {...item, input: input}
      }
      return item;
    }))
    setIsUpdate(false);
    setInput("");
  }

  return (
    <>
      <div>
        <input type="text" onChange={(e) => handleInput(e)} value={input} />
        <button onClick={isUpdate ? handleUpdateFunc : handleSubmit}>{isUpdate ? 'Update' : 'Click'}</button>
        <ul>
          {
            list?.map((item) => (
              <li key={item?.id}>{item?.input} <button onClick={() => handleDelete(item?.id)}>Delete</button> <button onClick={() => handleUpdate(item)}>Update</button></li>
            ))
          }
        </ul>
      </div>
    </>
  )
}

export default App
