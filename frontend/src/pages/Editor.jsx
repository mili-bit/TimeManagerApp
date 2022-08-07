import React from 'react'
import {
  PieChart,
  Pie,
  Tooltip,
  BarChart,
  XAxis,
  YAxis,
  Legend,
  Bar,
  CartesianGrid,
  Cell
} from "recharts";
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {reset} from '../features/auth/authSlice'
import { getHabits } from '../features/habits/habitSlice'
import {MdOutlineSelfImprovement} from 'react-icons/md'
import{TiWarning} from 'react-icons/ti'
import{AiOutlineSmile} from 'react-icons/ai'
import{MdArrowCircleUp} from 'react-icons/md'
import{MdArrowCircleDown} from 'react-icons/md'



const Editor = () => {

  const healthyHabits = [
    {typeOfActivity: "Sleeping", time: [7, 9], percent: "29%-38%"},
    {typeOfActivity: "Leisure & Sport", time: [0.5, 6], percent: "2%-17%"},
    {typeOfActivity: "Eat & Drinking", time: [1, 2], percent: "4%-8%"},
    {typeOfActivity: "Other activites", time: [0.5, 4], percent: "2%-17%"},
    {typeOfActivity: "Work & Related activities", time: [2, 10], percent: "8%-42%"},
    {typeOfActivity: "Chores", time: [2, 5], percent: "8%-21%"},
  ];
  // console.log(healthyHabits)
  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user } = useSelector((state) => state.auth)
  const { habits, isError, message } = useSelector((state) => state.habits)

  const [ formData, setFormData] = useState({
    dateChart: '',
  })

  const { dateChart } = formData

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

  const COLORS = ['#6666CC','#8884d8','#9999FF', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57','#CCFF99','#FFCCCC','#EF5350','#E53935','#9F5F9F','#871F78'];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end' } dominantBaseline="central">
     {`${(percent * 100).toFixed(0)}%`} 
    </text>
  );
  
};

// const countPrecentage=(item)=>{Math.round((item / 24) * 100)}


function formatDate(date){

  var dd = date.getDate();
  var mm = date.getMonth()+1;
  var yyyy = date.getFullYear();
  if(dd<10) {dd='0'+dd}
  if(mm<10) {mm='0'+mm}
  date = yyyy+'-'+mm+'-'+dd;
  return date
}

function Last7Days () {
  var result = [];
  for (var i=0; i<7; i++) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      result.push( formatDate(d) )
  }

  return(result);
}


// console.log(Last7Days());


const sumOfDailyHabits = (item) => {
  var sum = 0;
  for (var i = 0; i < item.length; i++) {
    // console.log(item);
    sum += item[i].time;
  }
  return sum;
};


const filterDateForStatistics = (item, pickedDate) => {
  const filterQuery = {
    day: pickedDate.concat("T00:00:00.000Z"),
  }

  const filteredData = item.filter(item => 
    Object.keys(filterQuery).every(key => (item[key]) === filterQuery[key])
    );
  return filteredData

}

const filterActivityForStatistics = (item, activity) => {
  const filterQuery = {
    typeOfActivity: activity,
  }

  const filteredData = item.filter(item => 
    Object.keys(filterQuery).every(key => (item[key]) === filterQuery[key])
    );
  return filteredData

}

const categorizedHabits = (item, chosenDate)=>{
  let tmp = filterDateForStatistics(item, chosenDate)
  // console.log("tmp")
  // console.log(tmp)
const arrNames = Array.from(new Set(tmp.map((x) => x.typeOfActivity))); // make an array of unique typeOfActivity's

const result = arrNames
  .map((x) => tmp.filter((y) => y.typeOfActivity === x)) // filter by typeOfActivity
  .map((x, i) => ({ typeOfActivity: arrNames[i], time: x.map((y) => y.time), day: x.map((y) => y.day),})); // make new objects 
//   console.log("arr")
// console.log(result)
var sum = 0;
for (var i = 0; i < result.length; i++) {
  for (var j = 0; j < result[i].time.length; j++) {
    sum += result[i].time[j];
    
  }result[i].day = result[i].day[0] 
  // console.log("day"+result[i].day)
}
var restOfDay = 24-sum
sum=0
for (i = 0; i < result.length; i++) {
  for (j = 0; j < result[i].time.length; j++) {
    sum += result[i].time[j];
    // console.log("iteration"+ i +","+j+": "+result[i].time[j])
  }
  result[i].time = sum
  sum = 0 
}
if(restOfDay > 0){
result.push({typeOfActivity: 'Not scheduled', time: restOfDay, day: chosenDate.concat("T00:00:00.000Z")})}
// console.log("new")
// console.log(result)
return result

}
// console.log(result)

let input = Last7Days()
let table = []
let activities = ["Sleeping", "Leisure & Sport", "Eat & Drinking", "Other activites", "Work & Related activities", "Chores"]
let tableA = []
for (var i = 0; i < input.length; i++) {
  table.push(categorizedHabits(habits, input[i]))
} 
for (i = 0; i < input.length; i++) {
  tableA.push(filterActivityForStatistics(habits, activities[i]))
  
}
// let tableB =  {} 
// tableB = filterActivityForStatistics(habits, activities[0])
// // tableB = JSON.parse(JSON.stringify(tableB));
// for (i = 0; i < tableB.length; i++) {
//   tableB[i].day = (tableB[i].day).split('T')[0]
  
// }

// console.log("result")
// console.log(tableB[0])


// console.log("result")
// console.log()
// console.log(filterDateForStatistics(categorizedHabits(habits, "2022-08-05"),  "2022-08-05"))

  return (
    <>
      <div className="heading">
        <h1>Charts of daily tasks</h1>
      </div>
      <div className="form-group">
        <label htmlFor="dateChart">Pick date for statistics</label>
        <input
          type="date"
          name="dateChart"
          id="dateChart"
          value={dateChart}
          onChange={onChange}
        />
      </div>
      <div className="heading">
        <p>Pie chart of daily tasks in hours and percentage</p>
      </div>
      <div>
        <div className="element">
          {filterDateForStatistics(habits, dateChart).length !== 0 ? (
            <PieChart width={500} height={500}>
              <Pie
                isAnimationActive={true}
                data={filterDateForStatistics(habits, dateChart).map(
                  (habit) => ({
                    name: habit.text,
                    time: habit.time,
                  })
                )}
                cx={200}
                cy={200}
                label
                outerRadius={150}
                fill="#8884d8"
                dataKey="time"
              >
                {filterDateForStatistics(habits, dateChart).map(
                  (habit, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  )
                )}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          ) : (
            <h3>You have no habits at this date</h3>
          )}
        </div>
        <div className="element">
          {categorizedHabits(habits, dateChart).length !== 0 ? (
            <PieChart width={400} height={500}>
              <Pie
                isAnimationActive={true}
                data={categorizedHabits(habits, dateChart).map((habit) => ({
                  name: habit.typeOfActivity,
                  time: habit.time,
                }))}
                cx={200}
                cy={200}
                labelLine={false}
                outerRadius={150}
                label={renderCustomizedLabel}
                fill="#8884d8"
                dataKey="time"
              >
                {categorizedHabits(habits, dateChart).map((habit, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          ) : (
            <h3>You have no habits at this date</h3>
          )}
        </div>
      </div>

      <div className="table">
        <h1 className="heading">Improve your habits</h1>
        {sumOfDailyHabits(filterDateForStatistics(habits, dateChart)) > 24 ? (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TiWarning color="crimson" size={25} />
            <p className="warning">
              {" "}
              Too many tasks!!! You cannot do all this task at one day, please
              change the plan.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <MdOutlineSelfImprovement size={40} />
            <p>{sumOfDailyHabits(filterDateForStatistics(habits,dateChart))}h scheduled</p>
          </div>
        )}
        <table className="table">
          <thead>
            <tr>
              <th>Type of activity</th>
              <th>Your habits</th>
              <th>Healthy habits</th>
              <th>Action on you</th>
            </tr>
          </thead>
          <tbody>
            {categorizedHabits(habits, dateChart).map((habit, i) => (
              <tr key={i}>
                <td>{habit.typeOfActivity}</td>
                <td>{Math.round((habit.time / 24) * 100)}%</td>
                <td>
                  {healthyHabits.map((item, i) =>
                    habit.typeOfActivity === item.typeOfActivity ? (
                      item.percent
                    ) : (
                      <p></p>
                    )
                  )}
                </td>
                <td>
                  {healthyHabits.map((item, i) =>
                    habit.typeOfActivity === item.typeOfActivity ? (
                      habit.time < item.time[0] ? (
                        <div className='info'
                          style={{ display: "flex", justifyContent: "center", color: "ff8c00" }}
                        >
                          <p>You are below the standard.</p>
                          <MdArrowCircleDown size={25} />
                        </div>
                      ) : habit.time > item.time[1] ? (
                        <div className='info'
                          style={{ display: "flex", justifyContent: "center", color: "ff8c00" }}
                        >
                          <p>You are above the norm.</p>
                          <MdArrowCircleUp size={25} />
                        </div>
                      ) : (
                        <div className='good'
                          style={{ display: "flex", justifyContent: "center"}}
                        >
                          <p>Great job! You are fine.</p>
                          <AiOutlineSmile size={20} />
                        </div>
                      )
                    ) : (
                      <p></p>
                    )
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>
          Note, the above assumptions of healthy habits are only a proposal and
          should not be the basis of lifestyle.
        </p>
      </div>
      <div className="heading">
        <p>Bar chart of daily tasks in hours</p>
      </div>
      <div className="table">
        {categorizedHabits(habits, dateChart).length !== 0 ? (
          <BarChart
          width={1000}
          height={300}
          data={categorizedHabits(habits, dateChart)}
          margin={{
            top: 20,
            bottom: 50,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="typeOfActivity" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="time" stackId="a" fill="#82ca9d" />
        </BarChart>
        ) : (
          <h3>You have no habits at this date</h3>
        )}
      </div>
    </>
  );
}

export default Editor