import { configureStore } from "@reduxjs/toolkit";
import userReducer from  "../Slices/userSlice"
import facultyReducer from  "../Slices/FacultySlice"
import CommitteSlice from "../Slices/CommitteSlice";

const store = configureStore(
    {
        reducer:{
            user : userReducer ,
            faculty : facultyReducer,
            committe : CommitteSlice
        }
    }
)

export default store;