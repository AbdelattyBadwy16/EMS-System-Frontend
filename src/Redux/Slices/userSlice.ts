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
                state.id = action.payload.id;
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
                state.role = action.payload.role;
            }

        }
    }

)


export const { addData } = userSlice.actions;

export const getId = (state : userInterFace) => {
    return state.id;
}

export const getToken = (state : userInterFace) => {
    return state.token;
}

export const getRefreshToken = (state : userInterFace) => {
    return state.refreshToken;
}

export const getRole = (state : userInterFace) => {
    return state.role;
}



export default userSlice.reducer;