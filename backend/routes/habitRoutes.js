const express = require('express')
const router = express.Router()
const { getHabits, setHabits, updateHabits, deleteHabits } = require('../controllers/habitController')
const {protect} = require('../middleware/authMiddleware')


router.route('/').get(protect, getHabits).post(protect,setHabits)

router.route('/:id').put(protect, updateHabits).delete(protect, deleteHabits)



module.exports = router