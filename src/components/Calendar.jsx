import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, getDay } from 'date-fns';

export default function Calendar({ tasks, handleDragStart, handleDrop, handleDragOver, saveTask }) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [newTaskDate, setNewTaskDate] = useState('');
  const [newTaskName, setNewTaskName] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const startDay = getDay(monthStart); // 0 = Sunday, 1 = Monday, etc.

// Create array with empty days at the start 
  const emptyDays = Array(startDay).fill(null);
  const calendarDays = [...emptyDays, ...days];  

  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));



const getTasksForDate = (date) => {
  return tasks.filter(task => {
    if (!task.dueDate) return false;
    
    const taskDateStr = task.dueDate;
    const currentDateStr = format(date, 'yyyy-MM-dd');
    
    return taskDateStr === currentDateStr;
  });
};
  const openAddTaskModal = (date) => {
  setSelectedDate(date);
  setNewTaskDate(format(date, 'yyyy-MM-dd')); 
  setShowModal(true);
};

  const handleSaveTask = () => {
  if (newTaskName.trim() === '') {
    alert('You should write your task');
    return;
  }

  saveTask({
    name: newTaskName,
    status: 'to do',
    dueDate: newTaskDate
  });

  setNewTaskName('');
  setShowModal(false);
};

  return (
    <div style={{ margin: '20px 0' }}>
      <h2>Task Calendar</h2>
      
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
        <button onClick={prevMonth} style={{ padding: '8px 16px' }}>←</button>
        <h3 style={{ margin: 0 }}>{format(currentDate, 'MMMM yyyy')}</h3>
        <button onClick={nextMonth} style={{ padding: '8px 16px' }}>→</button>
      </div>

   
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        gap: '8px',
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '10px'
      }}>
       
        { 
     
        
        ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
          <div key={day} style={{
            textAlign: 'center',
            fontWeight: 'bold',
            padding: '10px',
            backgroundColor: '#e0e0e0',
            borderRadius: '5px'
          }}>
            {day}
          </div>
        ))}

   
        {calendarDays.map((day,index) =>  {
  if (day === null) {
    return (
      <div 
        key={`empty-${index}`} 
        style={{
          minHeight: '100px',
          backgroundColor: '#f9f9f9'
        }}
      />
    );
  }
          const dayTasks = getTasksForDate(day);
          const isCurrentMonth = isSameMonth(day, currentDate);
          
          return (
            <div
              key={day.toISOString()}
              onDrop={(e) => handleDrop(e, 'to do', format(day, 'yyyy-MM-dd'))}
              onDragOver={handleDragOver}
              onClick={() => openAddTaskModal(day)}
              style={{
                minHeight: '100px',
                padding: '8px',
                backgroundColor: isCurrentMonth ? 'white' : '#f0f0f0',
                border: '1px solid #ddd',
                borderRadius: '5px',
                cursor: 'pointer',
                opacity: isCurrentMonth ? 1 : 0.5
              }}
            >
              <div style={{
                fontWeight: 'bold',
                marginBottom: '5px',
                color: isCurrentMonth ? 'black' : '#999'
              }}>
                {format(day, 'd')}
              </div>

   
              {dayTasks.map(task => (
                <div
                  key={task.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task.id)}
                  style={{
                    backgroundColor: '#3498db',
                    color: 'white',
                    padding: '3px 6px',
                    borderRadius: '3px',
                    fontSize: '12px',
                    marginBottom: '2px',
                    cursor: 'move',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap'
                  }}
                  title={task.name}
                >
                  {task.name}
                </div>
              ))}
            </div>
          );
        })}
      </div>


      {showModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '10px',
            width: '300px'
          }}>
            <h3>Add task {selectedDate && format(selectedDate, 'dd/MM/yyyy')}</h3>
            <input
              type="text"
              value={newTaskName}
              onChange={(e) => setNewTaskName(e.target.value)}
              placeholder="Task Name"
              style={{
                width: '100%',
                padding: '8px',
                marginBottom: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px'
              }}
            />
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
              <button onClick={() => setShowModal(false)} style={{ padding: '8px 16px' }}>
                Cancel
              </button>
              <button onClick={handleSaveTask} style={{ padding: '8px 16px', backgroundColor: '#3498db', color: 'white' }}>
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}