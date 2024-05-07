import { createSlice } from "@reduxjs/toolkit";

const initial = {
    userid: '',
    username: '',
    image: '',
    email: '',  
    phone: '',  
};

const userSlice = createSlice({
    name: 'user',
    initialState: initial,
    reducers: {
        setProfile: (state, action) => {
            state.userid = action.payload.userid;
            state.image = action.payload.image;
            state.username = action.payload.username;
            state.email = action.payload.email; 
            state.phone = action.payload.phone;  
        },
    },
});

export const { setProfile } = userSlice.actions;
export default userSlice.reducer;
