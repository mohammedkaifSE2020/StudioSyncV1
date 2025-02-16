import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./UserSlice.js"

const store = configureStore({
    reducer : {
        uset : userSlice,
    }
})

export default store;