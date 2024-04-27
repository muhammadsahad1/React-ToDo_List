import React, { useState , useEffect , useRef} from 'react';
import ToDoForm from './ToDoForm'
import { v4 as uuidv4  } from 'uuid'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ToDo from './ToDo';
import EditToDo from './EditToDo';
import Swal from 'sweetalert2'

const ToDoWrapper = () => {
  const [ToDos,setTodos ] =  useState([]);
  const [SearchTerm,setSearchTerm] = useState('');
  
  useEffect(()=>{
    
    const getItems = localStorage.getItem('todos')
    if(getItems){
      console.log(getItems)
      setTodos(JSON.parse(getItems))
    }
    
  },[])


  const addToset = (text) => {
    if(text.trim() !== ''){
      const newTask = {id : uuidv4 () , text : text , completed : false ,isEditing : false}
      const updateToDo = [...ToDos,newTask]
      setTodos(updateToDo)
      localStorage.setItem("todos",JSON.stringify(updateToDo))
      toast.success('Successfully added task!')
    }else{
      toast.error("Enter valid task")
    }
  
  }

  const deleteTask = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to delete this task!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      confirmButtonColor: '#3085d6',
      cancelButtonText: 'Cancel',
      cancelButtonColor: '#d33' 
    }).then((result)=>{
      if(result.isConfirmed){

        const updatedTasks = ToDos.filter(task => task.id !== id);
        setTodos(updatedTasks);
        localStorage.setItem('todos', JSON.stringify(updatedTasks)); // Update local storage here

      }
    })
  }

  const completedToggel = (id) => {
    setTodos(ToDos.map(todo => todo.id === id ? ({...todo,completed : !todo.completed}) : todo ))
    toast.success('Task Completed')
  }

  const editTodo = (  id) => {
    console.log(id)
    const updatedTask = ToDos.map(todo => todo.id === id ? ({...todo, isEditing : !todo.isEditing }) : todo)
    setTodos(updatedTask)
  };

    const editTask = (task,id) => {
      console.log(task)
      
      const updatedTask = ToDos.map(todo => todo.id === id ? ({...todo,text : task ,isEditing: !todo.isEditing }) : todo)
      setTodos(updatedTask)
      localStorage.setItem('todos',JSON.stringify(updatedTask))
      toast.success('Successfully Updated Task!')
    }

    const handleSearch = (event) => {
        setSearchTerm(event.target.value)
    }

    const filledSearch  = ToDos.filter(todo => todo.text.includes(SearchTerm.toLowerCase()))


  return (
    <div className='TodoWrapper'>
      <h1>Your Path to Success</h1>
      <ToDoForm addToset = {addToset}/>
      <div className='searchDiv' >
        <input value={SearchTerm} className ='search_input' type='text' placeholder='Search task here' onChange={handleSearch}/>
      </div>
      {ToDos.map((task,index)=>{
        return (
          task.isEditing ? (
            <EditToDo key={index} editTodo ={editTask} task ={task}/>
          ) : (
            
            <ToDo task ={task} key ={index} deleteTask ={deleteTask} completedToggel ={completedToggel} editTodo = {editTodo} />
          )
        )
    })}
      <ToastContainer />
    </div>
  )
}

export default ToDoWrapper
