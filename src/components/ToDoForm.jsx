import React ,{useState, useRef, useEffect} from 'react'

const ToDoForm = ({addToset}) => {

  const [value,setValue] = useState('')
  const input = useRef(null)

  // useEffect(()=>{
  //   input.current.focus()
  // })

  const handleSumbit = (e) => {
      e.preventDefault()
    addToset(value)
    setValue('')
  }

  return (
    <div>
      <form className='TodoForm' onSubmit={handleSumbit}>
        <input className='todo-input' value={value} type="text" placeholder='What is the task today ? ' onChange={((e)=>setValue(e.target.value))}/>
        <button className='todo-btn ' type="submit">Add</button>
      </form>
    </div>
  )
}

export default ToDoForm
