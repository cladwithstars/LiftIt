import React, {useReducer} from 'react';
import AuthContext from './authContext';
import authReducer from './authReducer';
import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken'

import {
    REGISTER_SUCCESS, 
    REGISTER_FAIL, 
    USER_LOADED,
    AUTH_ERROR ,
    LOGIN_SUCCESS, 
    LOGIN_FAIL, 
    LOGOUT, 
    CLEAR_ERRORS, 

} from '../types'

const AuthState = props => {
    const initialState = {
        token: localStorage.getItem('token'),
        isAuthenticated: null,
        loading: true,
        error: null,
        user: null
    }

    const [state, dispatch] = useReducer(authReducer, initialState);

    // Load User
    //async bc we're making a request to the backend
    const loadUser = async () => {
        if(localStorage.token) {
            setAuthToken(localStorage.token);
        }
        try {
            const res = await axios.get('/api/auth');

            dispatch({type: USER_LOADED, payload: res.data}) //res.data is the user data
        } catch (err) {
            //invalid credentials
            dispatch({type: AUTH_ERROR})
        }
    }
    //Register User
    const register = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/users', formData, config) //can use this shortform bc of proxy in package.json
            dispatch({
                type: REGISTER_SUCCESS, 
                payload: res.data
            })

            loadUser();
        } catch(err){ 
            dispatch({
                type: REGISTER_FAIL,
                payload: err.response.data.msg
            })
        }
    }
    //Login User
    const login = async formData => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/auth', formData, config) //can use this shortform bc of proxy in package.json
            dispatch({
                type: LOGIN_SUCCESS, 
                payload: res.data
            })

            loadUser();
        } catch(err){ 
            dispatch({
                type: LOGIN_FAIL,
                payload: err.response.data.msg
            })
        }
    }
    //Logout
    const logout = () => dispatch({type: LOGOUT})
    // Clear Errors

    const clearErrors = () => dispatch({type: CLEAR_ERRORS})

    return (
        <AuthContext.Provider
        value={{
            token: state.token,
            isAuthenticated: state.isAuthenticated,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            clearErrors,
            loadUser,
            login,
            logout
        }}
        >
            {props.children}
        </AuthContext.Provider>
        )
}

export default AuthState;