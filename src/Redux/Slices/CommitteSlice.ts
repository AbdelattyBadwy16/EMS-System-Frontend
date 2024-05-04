import { createSlice } from "@reduxjs/toolkit"




var initialState = {
    data : []

}


const committeSlice = createSlice(
    {
        name: 'commite',
        initialState,
        reducers: {
            addCommites(state, action) {
                console.log(action);
                state.data = action.payload;
            }

        }
    }

)


export const { addCommites } = committeSlice.actions;

export const getCommites = (state : any) => {
    return state.commite.data;
}






export default committeSlice.reducer;