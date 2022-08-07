const asyncHandler = require('express-async-handler')

const Habit = require('../models/habitsModel')
const User = require('../models/userModel')

// Route: GET /api/habits
const getHabits = asyncHandler(async (req, res) => {
    const habits = await Habit.find({ user: req.user.id })

    res.status(200).json(habits)
})

// Route: POST /api/habits
const setHabits = asyncHandler(async (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add text fiels')
    }

    if(!req.body.day){
        res.status(400)
        throw new Error('Please add a day of doing this habit')
    }

    if(!req.body.time){
        res.status(400)
        throw new Error('Please add time')
    }

    if(!req.body.typeOfActivity){
        res.status(400)
        throw new Error('Please add type of activity')
    }
    
    const habit = await Habit.create({
        text: req.body.text,
        user: req.user.id,
        time: req.body.time,
        day: req.body.day,
        typeOfActivity: req.body.typeOfActivity

    })

    res.status(200).json(habit)
})

// Route: PUT /api/habits/id
const updateHabits = asyncHandler(async (req, res) => {
    const habit = await Habit.findById(req.params.id)

    if(!habit){
        res.status(400)
        throw new Error('Habit not found')
    }

    //Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //Cheks the logged user matches the habit user
    if(habit.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    const  updatedHabit = await Habit.findByIdAndUpdate(req.params.id, req.body,
        {
            new: true
        })
    res.status(200).json(updatedHabit)
})

// Route: DELETE /api/habits/id
const deleteHabits = asyncHandler(async (req, res) => {
    const habit = await Habit.findById(req.params.id)

    if(!habit){
        res.status(400)
        throw new Error('Habit not found')
    }

    //Check for user
    if(!req.user){
        res.status(401)
        throw new Error('User not found')
    }

    //Cheks the logged user matches the habit user
    if(habit.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('User not authorized')
    }

    await habit.remove()

    res.status(200).json({message: 'Habit succesfully deleted', id: req.params.id})
})




module.exports = {
    getHabits,
    setHabits,
    updateHabits,
    deleteHabits
}