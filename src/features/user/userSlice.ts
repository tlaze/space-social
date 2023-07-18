import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { putUser } from "./userAPI";

export interface UserRow{
    userId:number 
    userName:string 
    userEmail:string 
    userPassword:string
}

export interface Comment{
    comment:string 
    user:number 
    article:number
}

export interface UserState{
    userTable: UserRow[] 
    current: UserRow 
    comments: Comment[]
    status: string 
    error: string
}

const initialState: UserState = {
    userTable: [],
    current: {userId:0, userName:"", userEmail:"", userPassword:""},
    comments: [],
    status: 'idle',
    error: ""
}

export const putAsync = createAsyncThunk(
    'user/putUser',
    async (user: UserRow) => {
      const response = await putUser(user);
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    }
  );

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        put: (state, action) => {
            if(state.userTable.length===0){
                action.payload.userId = 1;
            }
        }
        // put(user:UserRow):UserRow{
        //     if(this.userTable.length===0){
        //         user.userId = 1;
        //     }else{
        //         const max = this.userTable.reduce((prev, cur) => (prev.userId > cur.userId) ? prev:cur);
        //         user.userId = max.userId+1;
        //     }
        //     this.userTable.push(user);
        //     return user;
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(putAsync.pending, (state, action)=>{
                state.status = 'loading'
            })
            .addCase(putAsync.fulfilled, (state, action)=>{
                state.status = 'succeeded'
                state.userTable = state.userTable.concat(action.payload)
            })
            .addCase(putAsync.rejected, (state, action)=>{
                state.status = 'failed'
                state.error = action.error.message ? action.error.message:"Something went wrong"
            })
    },
})

