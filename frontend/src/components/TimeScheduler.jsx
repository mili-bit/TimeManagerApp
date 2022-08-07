import React from "react";
import { useDispatch } from 'react-redux'
import { deleteHabit } from '../features/habits/habitSlice'


function TimeScheduler({habit}) {

    const dispatch = useDispatch()

    const onDeleteHabit = () => {
        dispatch(deleteHabit(habit._id))
    }

    return (
        <>   
    
            <td>{habit.text}</td>
            <td>{habit.typeOfActivity}</td>
            <td>{habit.time}</td>
            <td>{String(habit.day).split('T')[0]}</td>
            {/* <td>{String(habit.deadline).split('T')[0]}</td>    */}
            <td><button onClick={onDeleteHabit} className='close btn' margin="center">
              Delete
          </button></td>
        </>
      )


}
 
  
export default TimeScheduler
