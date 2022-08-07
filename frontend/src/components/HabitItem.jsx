import React from 'react'
import { useDispatch } from 'react-redux'
import { deleteHabit } from '../features/habits/habitSlice'
function HabitItem({habit}) {

  const dispatch = useDispatch()

  const onDeleteHabit = () => {
    dispatch(deleteHabit(habit._id))
  }

  return (
    <>
      <section className='habit'>
          <div>
              {/* <h2>Created at: {new Date(habit.createdAt).toLocaleString('pl-PL')}</h2> */}
          </div>
          <h2><b>{habit.text}</b></h2> 
          <h2>Time to do: {habit.time} hours</h2>
          <h2>To do at: {String(habit.day).split('T')[0]}</h2>
          {/* <h2>Deadline at: {String(habit.deadline).split('T')[0]}</h2> */}
          <h2>Chosen activity: <i>{habit.typeOfActivity}</i></h2>  
          <button onClick={onDeleteHabit} className='close'>
              X
          </button>
      </section>
      
    </>
  )
}

export default HabitItem