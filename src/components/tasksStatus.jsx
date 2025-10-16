

export default function TaskStatus({tasks, status, handleDragStart, handleDragOver, handleDrop,
color
}) {
  return (
    <>
      <div
      onDrop={(e)=> handleDrop(e, status)}
      onDragOver={handleDragOver}
      style={{
        width:'90%',
        border: '1px solid #ccc',
        minHeight: '50px',
        backgroundColor: color ? `${color}20` : '#433e504e',
        color: 'black',
        borderRadius: '5px',
        textAlign: 'center',  

      }}>
        <p
        style={{fontWeight: 'bold',
          color: color || 'black' 
        }}>{status}</p>
        {tasks.filter((task)=> task.status === status).map((task)=> (

            <div key={task.id}
            draggable
            onDragStart={(e)=> handleDragStart(e, task.id)} style={{
             backgroundColor: color ? `${color}30` : 'white'}}
            >

                <span>{task.name}</span>
                <p>{task.status}</p>
            </div>
        )

        )}

      </div>
    </>
  )
}
