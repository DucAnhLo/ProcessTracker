import { createContext, useReducer } from "react";
import axios from 'axios'
import {AuthReducers} from '../reducers/AuthReducers'

export const AuthContext = createContext()

//Initial State


//Provider 
export const  AuthProvider = ({children}) => {
    const [authState, dispatch] = useReducer(AuthReducers, {
        authLoading: true,
        isAuthenticated: false,
        user: null 
    })

    //login method
    const loginUser = async userForm => {
        try {
            const response = await axios.post('http:/localhost:5010/api/v1/auth/login')
        } catch (error) {
            
        }
    }
}
