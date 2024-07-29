import {combineReducers,configureStore} from '@reduxjs/toolkit'
// simplifies the process of creating a Redux store with good default settings
import userReducer from "./user/userSlice.js"
import {persistReducer,persistStore} from "redux-persist"
// when a user refreshes the page or reopens the application, the state is restored from where it was left off.
import storage from 'redux-persist/lib/storage'
//after reload all the data are delete from the browser 
//we have to store it in the localStorage which is persists in react-redux
const rootReducer=combineReducers({user:userReducer})
const persistConfig={
    key:"root",
    storage,
    version:1
}
const persistedReducer=persistReducer(persistConfig,rootReducer)
export const store=configureStore({
    reducer:persistedReducer,
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
        serializableCheck:false
    })  
})
export const persistor=persistStore(store)