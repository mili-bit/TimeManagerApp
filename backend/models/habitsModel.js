const mongoose = require('mongoose')

const habitSchema = mongoose.Schema(
    {
        user:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
        text:{
            type: String,
            required: [true,'Please add a text value'],
        },
        time:{
            type: Number,
            required: [true,'Please add a time value'],
        },
        day:{ 
            type: Date,
            required: [true,'Please add a day of doing this habit'],
        },
        typeOfActivity:{
            type: String,
            required: [true,'Please add a type of doing activity'],
        },

    },
    {
        timestamps: true,
    }
)

module.exports = mongoose.model('Habit', habitSchema)