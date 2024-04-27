import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faTrash } from '@fortawesome/free-solid-svg-icons';
const ToDo = ({task,deleteTask,completedToggel,editTodo}) => {
  return (
    <div className='Todo'>
      <p onClick={()=>completedToggel(task.id)} className={`${task.completed ? 'completed' : "incompleted"}`}>{task.text}</p>
      <div className='iconDiv'>
      <FontAwesomeIcon key={task.id} className="edit-icon" icon={faPenToSquare} onClick={()=> editTodo(task.id)} />
      <FontAwesomeIcon className='delete-icon ' icon={faTrash} onClick={ () => deleteTask(task.id) }/>
    
      </div>
      
    </div>
  )
}

export default ToDo
