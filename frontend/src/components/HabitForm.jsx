import React from 'react'
import { useState } from 'react'
import {useDispatch} from 'react-redux'
import {createHabit} from '../features/habits/habitSlice'

const HabitForm = () => {
    const [ formData, setFormData] = useState({
        text: '',
        time: '',
        day: '',
        typeOfActivity: '',
        deadline: '',
      })

    const { text, time, day, typeOfActivity, deadline } = formData

    const dispatch = useDispatch()

    const onSubmit = (e) => {
        e.preventDefault()

        const habitData = {
            text,
            day,
            deadline,
            time,
            typeOfActivity,
          }

        dispatch(createHabit(habitData))

        
        setFormData({text: '',
        time: '',
        day: '',
        typeOfActivity: '',
        deadline: '',})
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }

  return (
    <section className='form'>
        <form onSubmit={onSubmit}>
            <div className='form-group'>
                <label htmlFor='text'>Habit</label>
                <input
                type='text'
                name='text'
                id='text'
                value={text}
                onChange={onChange}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='time'>How much time do you need for this habit? (in hours)</label>
                <input
                type='number'
                name='time'
                id='time'
                value={time}
                onChange={onChange}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='day'>When do you want to do this?</label>
                <input
                type='date'
                name='day'
                id='day'
                value={day}
                onChange={onChange}
                />
            </div>
            <div className='form-group'>
                <label htmlFor='typeOfActivity'>Choose type of activity</label>
                <select type ='string' name='typeOfActivity' value={typeOfActivity} onChange={onChange}>
                <option value="Type of activity">Type of activity</option>
                <option value="Sleeping">Sleeping</option>
                <option value="Leisure &amp; Sport">Leisure &amp; Sport</option>
                <option value="Work &amp; Related activities"> Work &amp; Related activities</option>
                <option value="Chores">Chores</option>
                <option value="Eat &amp; Drinking">Eat &amp; Drinking</option>
                <option value="Other activites">Other activites</option></select>
            </div>
            {/* <div className='form-group'>
                <label htmlFor='deadline'>Deadline</label>
                <input
                type='date'
                name='deadline'
                id='deadline'
                value={deadline}
                onChange={onChange}
                />
            </div> */}
            <div className='form-group'>
                <button className='btn btn-block bg-rose-800 hover:bg-rose-700' type='submit'onChange={onChange}>
                    Add habit
                </button>
            </div>
        </form>
    </section>
  )

  
}



export default HabitForm