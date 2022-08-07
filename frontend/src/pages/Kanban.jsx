import React from 'react'
import { useEffect , useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getHabits } from '../features/habits/habitSlice'
import {reset} from '../features/auth/authSlice'
import TimeScheduler from '../components/TimeScheduler'
import {MdOutlineSelfImprovement} from 'react-icons/md'
import{TiWarning} from 'react-icons/ti'

const Kanban = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { habits, isError, message } = useSelector((state) => state.habits)

  const [ formData, setFormData] = useState({
    scheduler: '',
    pickedDate: '',
  })

  const { scheduler, pickedDate } = formData

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

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const sumOfDailyHabits = (item) => {
    var sum = 0;
    for (var i = 0; i < item.length; i++) {
      // console.log(item);
      sum += item[i].time;
    }
    return sum;
  };
  

  const filterDateForStatistics = (pickedDate) => {
    const filterQuery = {
      day: pickedDate.concat("T00:00:00.000Z"),
    }
  
    const filteredData = habits.filter(item => 
      Object.keys(filterQuery).every(key => (item[key]) === filterQuery[key])
      );
    return filteredData
  
  }

    let habitListTime;
    const ascending = [].concat(filterDateForStatistics(pickedDate))

    if (ascending.length > 0) {

      ascending.sort((a, b) => a.time > b.time ? 1:-1)

      habitListTime = ascending.map((habit,i) => (
        <tr key={i}><TimeScheduler key={habit._id} habit={habit} /></tr>
        
      ))
    } else {
      habitListTime = <td colSpan="5"><h3>You have not set any habits</h3></td>
    }

    let habitListDeadline;
    const desending = [].concat(filterDateForStatistics(pickedDate))

    if (desending.length > 0) {

      desending.sort((a, b) => a.time > b.time ? -1:1)

      habitListDeadline = desending.map((habit,i) => (
        <tr key={i}><TimeScheduler key={habit._id} habit={habit} /></tr>
        
      ))
    } else {
      habitListDeadline = <td colSpan="5"><h3>You have not set any habits</h3></td>
    }

    const renderSwitch = (param) => {
      switch(param) {
        case 'duration':
          return (<table className="table">  
          
          <thead>
            <tr>
            <th>Habit name</th>
            <th>Type of activity</th>
            <th>Duration of the habit (hours)</th>
            <th>Day of doing task</th>
            {/* <th>Day of deadline</th> */}
            <th>Action</th>
            </tr>
          </thead>
                <tbody> 
                  {(pickedDate !== ' ')?(
                  habitListTime
                  ):(<td colSpan="5"><h3>Please choose date to filter habits</h3></td>)}
                </tbody>
      </table>);
        case 'deadline':
          return ( <table className="table">  
          
          <thead>
            <tr>
              <th>Habit name</th>
              <th>Type of activity</th>
              <th>Duration of the habit (hours)</th>
              <th>Day of doing task</th>
              <th>Action</th>
            </tr>
          </thead>
                <tbody>                   
                  {(pickedDate !== ' ')?(
                   habitListDeadline
                  ):(<td colSpan="5"><h3>Please choose date to filter habits</h3></td>)}
                </tbody>
      </table> );
        default:
          return (
            <table className="table">
              <thead>
                <tr>
                  <th>Habit name</th>
                  <th>Type of activity</th>
                  <th>Duration of the habit (hours)</th>
                  <th>Day of doing task</th>
                  {/* <th>Day of deadline</th> */}
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {pickedDate !== " " ? (
                  filterDateForStatistics(pickedDate).length === 0 ? (
                    <td colSpan="5">
                      <h3>You have not set any habits</h3>
                    </td>
                  ) : (
                    filterDateForStatistics(pickedDate).map((habit, i) => (
                      <tr key={i}>
                        <TimeScheduler key={habit._id} habit={habit} />
                      </tr>
                    ))
                  )
                ) : (
                  <td colSpan="5">
                    <h3>Please choose date to filter habits</h3>
                  </td>
                )}
              </tbody>
            </table>
          );
      }
    }

  return (
    <>

    <section className='heading'>
        <h1>Welcome in scheduler</h1>
    </section>

    <div className='form-group'>
      <label htmlFor='scheduler'>Choose filter</label>
      <select name='scheduler' value={scheduler} onChange={onChange}>
        <option value="default">Habits orderd by default</option>
        <option value="duration">Habits orderd by descending duration of the habit</option>
        <option value="deadline">Habits orderd by ascending duration of the habit</option>
      </select>
  </div>

      <div className="form-group">
        <label htmlFor="pickedDate">Pick date for statistics</label>
        <input
          type="date"
          name="pickedDate"
          id="pickedDate"
          value={pickedDate}
          onChange={onChange}
        />
      </div>
      
      <div>{sumOfDailyHabits(filterDateForStatistics(pickedDate)) > 24 ? (
          <div style={{display: "flex", justifyContent: "center"}}><TiWarning color="crimson" size={25}/><p className='warning'>  Too many tasks!!! You cannot do all this task at one day, please change the plan.</p></div>
        ):(<div style={{display: "flex", justifyContent: "center"}}><MdOutlineSelfImprovement  size={40}/><p>{sumOfDailyHabits(filterDateForStatistics(pickedDate))}h scheduled</p></div>)}</div>
    
    <div>{renderSwitch(scheduler)}</div>


</>
  )
}

export default Kanban