import { useState } from 'react'
import TaskStatus from './components/tasksStatus'
import Calendar from './components/Calendar'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      name: 'Learn React',
      status: 'to do',
      dueDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Learn Javascript',
      status: 'done',
      dueDate: '2024-01-10'
    },
    {
      id: 3,
      name: 'Learn Python',
      status: 'to do',
      dueDate: '2024-01-20'
    }
  ]);

  const [newTask, setNewTask] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');

  
  const saveTaskFromForm = () => {
    if(newTask.trim() === ''){
      alert('You should write your task ');
      return;
    }
 
    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        name: newTask,
        status: 'to do',
        dueDate: newTaskDate || null
      }
    ]);
    setNewTask('');
    setNewTaskDate('');
  }

  const saveTaskFromCalendar = (taskData) => {
    if(!taskData.name || taskData.name.trim() === ''){
      alert('You should write your task ');
      return;
    }
 
    setTasks([
      ...tasks,
      {
        id: tasks.length + 1,
        name: taskData.name,
        status: taskData.status || 'to do',
        dueDate: taskData.dueDate || null
      }
    ]);
  }

  //Drag and Drop functions 
  const handleDragStart = (e, id) => {
    e.dataTransfer.setData('id', id);
  }
  
  const handleDragOver = (e) => {
    e.preventDefault();
  }
  
  const handleDrop = (e, newStatus, dueDate = null) => {
    const id = e.dataTransfer.getData('id');
    setTasks(tasks.map(task => 
      task.id === Number(id) ? { 
        ...task, 
        status: newStatus,
        dueDate: dueDate || task.dueDate 
      } : task
    ));
  };

  return (
    <>
      <div> 
        <h2>New Task:</h2>
        <input 
          type="text" 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)}
          placeholder='set new task' 
          style={{
            width: '50%', 
            padding: '10px', 
            borderRadius: '4px'
          }}
        />
        <input 
          type="date"
          value={newTaskDate}
          onChange={(e) => setNewTaskDate(e.target.value)}
          style={{
            marginLeft: '10px',
            padding: '10px',
            borderRadius: '4px'
          }}
        />
        <button 
          onClick={saveTaskFromForm} 
          className='btn2'
          style={{
            marginLeft: '10px', 
          }}
        >
          Save task
        </button>
      </div>

      <Calendar
        tasks={tasks}
        handleDragStart={handleDragStart}
        handleDragOver={handleDragOver}
        handleDrop={handleDrop}
        saveTask={saveTaskFromCalendar} 
      />

      <div>
        <h2>Tasks Status</h2>
        <div 
          style={{
            display: 'flex',
            flexDirection: 'row', 
            gap: '10rem',
            width: '100%',
          }}
        >
          <TaskStatus 
            tasks={tasks} 
            status='to do' 
            color={'#3498db'}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver} 
            handleDrop={handleDrop}
          /> 
          <TaskStatus 
            tasks={tasks} 
            status='indev' 
            color={'#f39c12'}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver} 
            handleDrop={handleDrop}
          />  
          <TaskStatus 
            tasks={tasks} 
            status='done' 
            color={'#2ecc71'}
            handleDragStart={handleDragStart}
            handleDragOver={handleDragOver} 
            handleDrop={handleDrop}
          />          
        </div>
      </div>
    </>
  )
}

export default App