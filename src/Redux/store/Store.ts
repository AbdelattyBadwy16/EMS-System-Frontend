import { configureStore } from "@reduxjs/toolkit";
import userReducer from  "../Slices/userSlice"
import facultyReducer from  "../Slices/FacultySlice"

const store = configureStore(
    {
        reducer:{
            user : userReducer ,
            faculty : facultyReducer
        }
    }
)

export default store;