import { useState, useReducer } from 'react'
import {produce} from "immer"
import './App.css'

function App() {
  const [tasks, dispatch] = useReducer(reducer,[])
  const [id, setId] = useState(0)
  
  function Form(){
    return(
      <form onSubmit={handleCreate}>
        <input type='text' name='task'/>
        <br/>
        <br/>
        <input type='submit'/>
        <br/>
        <br/>
      </form>
    )
  }  

  function handleCreate(e){
    e.preventDefault()
    dispatch({
      type: "create",
      toDo: e.target.task.value,
      key: indexer(),
      passedKey: indexer()
    })
  }   

  function indexer(){
    const tempId = id
    setId(id + 1)
    return tempId
  }

  function List(){
    return(
      <ul>
        {tasks}
      </ul>
    )
  }

  function ToDo({toDo, passedKey}){
    return(  
      <li accessKey={passedKey}>
        {toDo}
        <form onSubmit={handleUpdate}>
          <input type='text' name="newTask" />
          <input type='submit' value="Change"/>
        </form>
        <form onSubmit={handelDelete}>
          <input type="submit" value="Delete"/>
        </form>
      </li>
    )
  }
    
  function handleUpdate(e){
    const itemKey = e.target.parentNode.accessKey
    e.preventDefault()
    dispatch({
     type: "update",
     itemKey: itemKey,
     value: e.target.newTask.value
    })    
  }

  function handelDelete(e){
    e.preventDefault()
    const itemKey = e.target.parentNode.accessKey 
    dispatch({
      type: "delete",
      itemKey: itemKey
    })
  }

  return(
    <>
      <Form />
      <List />
    </>
    )
  
  function reducer(tasks, action){
      if(action.type === "create"){
        return produce(tasks, draft => {draft.push(<ToDo toDo={action.toDo} key={action.key} passedKey={action.key}/>)})
      }else if(action.type === "update"){
        return tasks.map(task =>{
          if(task.props.passedKey == action.itemKey){
            return <ToDo toDo={action.value} passedKey={action.itemKey} key={action.itemKey} />
          } 
          return task
          })      
      }else if(action.type === "delete"){
        return tasks.filter( (task) => {
          return task.key != action.itemKey
        })
      }
    }  
}

export default App
