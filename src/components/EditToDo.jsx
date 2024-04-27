import React ,{useState, useRef, useEffect} from 'react'

const EditToDo = ({editTodo,task}) => {

  const [value,setValue] = useState(task.text)
  const input = useRef(null)

  useEffect(()=>{
    input.current.focus()
  })

  const handleSumbit = (e) => {
      e.preventDefault()
      editTodo(value,task.id)
      setValue('')
  }

  return (
    <div>
      
      <form className='TodoForm' onSubmit={handleSumbit}>
        <input className='todo-input' ref={input} value={value} type="text" placeholder='Update Task' onChange={((e)=>setValue(e.target.value))}/>
        <button className='todo-btn ' type="submit" >Update Task</button>
      </form>
    </div>
  )
}

export default EditToDo
