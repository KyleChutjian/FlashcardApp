import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const SET_USER_INFO = 'SET_USER_INFO';

export const setUserInfo = (user_id: string, name: string) => ({
    type: SET_USER_INFO,
    payload: {user_id, name},
});

const initialState = {
    userInfo: {
        user_id: "",
        name: ""
    },
};

const reducer = (state = initialState, action: any) => {
    switch (action.type) {
        case SET_USER_INFO:
            return {
                ...state,
                userInfo: action.payload,
            };
        default:
            return state;
    }
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setLoginData: (state, action:PayloadAction<{user_id: string, name: string}>) => {
            state.userInfo.user_id = action.payload.user_id
            state.userInfo.name = action.payload.name
        }
    }
    
});

export default userSlice.reducer;
export const { setLoginData } = userSlice.actions;