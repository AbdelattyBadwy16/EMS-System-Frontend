import { createSlice } from "@reduxjs/toolkit"


interface facultyInterFace {
    id: string,
    name: string,

}

var initialState: facultyInterFace = {
    id: "",
    name: "",

}


const facultySlice = createSlice(
    {
        name: 'faculty',
        initialState,
        reducers: {
            addFacultyData(state, action) {
                state.id = action.payload.id;
                state.name = action.payload.name;
            }

        }
    }

)


export const { addFacultyData } = facultySlice.actions;

export const getgetFacultyId = (state : any) => {
    return state.faculty.id;
}

export const getFacultyName = (state : any) => {
    return state.faculty.name;
}




export default facultySlice.reducer;