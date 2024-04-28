import { createSlice } from "@reduxjs/toolkit"


interface userInterFace {
    id: string,
    token: string,
    refreshToken: string,
    role: []
}

var initialState: userInterFace = {
    id: "",
    token: "",
    refreshToken: "",
    role: []
}


const userSlice = createSlice(
    {
        name: 'user',
        initialState,
        reducers: {
            addData(state, action) {
                console.log(action);
                state.id = action.payload.id;
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
                state.role = action.payload.role;
            }

        }
    }

)


export const { addData } = userSlice.actions;

export const getId = (state : any) => {
    return state.user.id;
}

export const getToken = (state : any) => {
    return state.user.token;
}

export const getRefreshToken = (state : any) => {
    return state.user.refreshToken;
}

export const getRole = (state : any) => {
    return state.user.role;
}



export default userSlice.reducer;