import {createSlice} from "@reduxjs/toolkit"

const initialState={
    currentUser:null,
    error:null,
    loading:false
}
const userSlice=createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart:(state)=>{
            state.loading=true
        },
        signInSuccess:(state,action)=>{
            state.currentUser=action.payload
            state.loading=false
            state.error=null
        },
        signInFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        updateUserStart:(state)=>{
            state.loading=true
        },
        updateUserSuccess:(state,action)=>{
            state.loading=false
            state.currentUser=action.payload
            state.error=false
        },
        UpdateUserFailure:(state)=>{
            state.error=true
            state.loading=false
        },
        deleteUserStart:(state)=>{
            state.loading=true
        },
        deleteUserSuccess:(state)=>{
            state.loading=false
            state.currentUser=null
            state.error=null
        },
        deleteUserFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        },
        signoutUserStart:(state)=>{
            state.loading=true
        },
        signoutUserSuccess:(state)=>{
            state.loading=false
            state.currentUser=null
            state.error=null
        },
        signoutUserFailure:(state,action)=>{
            state.error=action.payload
            state.loading=false
        }
    }
})
export const {signInSuccess,signInFailure,signInStart,updateUserStart,updateUserSuccess,UpdateUserFailure,deleteUserStart,deleteUserSuccess,deleteUserFailure,signoutUserStart,signoutUserSuccess,signoutUserFailure}=userSlice.actions
export default userSlice.reducer