import React from 'react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import HabitForm from '../components/HabitForm'
import { getHabits } from '../features/habits/habitSlice'
import {reset} from '../features/auth/authSlice'
import HabitItem from '../components/HabitItem'

function Dashboard(){
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { habits, isError, message } = useSelector((state) => state.habits)


  useEffect(() => {
    if(isError){
      console.log(message)
    }

    if(!user){
      navigate('/login')
    }

    dispatch(getHabits())

    return() => {
      dispatch(reset())
    }

  }, [ user, navigate, isError, message, dispatch])

  return (
    <>
      <section className='heading'>
        <h1>Welcome {user && user.name}</h1>
        <p>Habits dashboard</p>
      </section>

      <HabitForm/>

      <section className="content">
        {habits.length > 0 ? (
          <div className='habits'>
            {habits.map((habit) => (
              <HabitItem key={habit._id} habit={habit} />
            ))}
          </div>
        ) : (
          <h3>You have not set any habits</h3>
        )}
      </section>

     
    </>
  )
}

export default Dashboard