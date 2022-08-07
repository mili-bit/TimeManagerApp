import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import habitService from "./habitService";

const initialState = {

    habits:[],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

//Create new habit
export const createHabit = createAsyncThunk('habits/create', 
    async (habitData, thunkAPI) => {
        try{
            const token = thunkAPI.getState().auth.user.token
            return await habitService.createHabit(habitData, token)
        } catch (error) {
            const message =
                (error.response &&
                error.response.data &&
                error.response.data.message) ||
                error.message ||
                error.toString()
            return thunkAPI.rejectWithValue(message)
    }

})

// Get user habits
export const getHabits = createAsyncThunk('habits/getAll',
    async (_, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await habitService.getHabits(token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
)

// Delete user habit
export const deleteHabit = createAsyncThunk('habits/delete',
    async (id, thunkAPI) => {
      try {
        const token = thunkAPI.getState().auth.user.token
        return await habitService.deleteHabit(id, token)
      } catch (error) {
        const message =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString()
        return thunkAPI.rejectWithValue(message)
      }
    }
  )


export const  habitSlice = createSlice({
    name: 'habit',
    initialState,
    reducers:{
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(createHabit.pending, (state) => {
                state.isLoading = true
            })
            .addCase(createHabit.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.habits.push(action.payload)
            })
            .addCase(createHabit.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(getHabits.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getHabits.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.habits = action.payload
            })
            .addCase(getHabits.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
            .addCase(deleteHabit.pending, (state) => {
                state.isLoading = true
            })
            .addCase(deleteHabit.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.habits = state.habits.filter(
                    (habit) => habit._id !== action.payload.id
                )
            })
            .addCase(deleteHabit.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    },


})

export const {reset} = habitSlice.actions
export default habitSlice.reducer