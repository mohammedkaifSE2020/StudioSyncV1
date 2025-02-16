import {createSlice} from "@reduxjs/toolkit"

const initialState = {
   currentUser :JSON.parse(localStorage.getItem('user')) || null,
   loading : false,
   error : null
}

const userSlice = createSlice({
    name : "user",
    initialState,
    reducers : {
        login : (state,action)=>{
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null
        },
        logout : (state,action)=>{
            state.currentUser = action.payload,
            state.loading = false,
            state.error = null
        }
    }
})

export const {logout,login} = userSlice.actions;

export default userSlice.reducer