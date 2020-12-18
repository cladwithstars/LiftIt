import React, {useReducer} from 'react';
import LiftContext from './liftContext';
import liftReducer from './liftReducer';
import axios from 'axios';
import {
    GET_LIFTS,
    ADD_LIFT,
    DELETE_LIFT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_LIFT,
    FILTER_LIFTS,
    CLEAR_LIFTS,
    CLEAR_FILTER,
    LIFT_ERROR,
} from '../types'

const LiftState = props => {
    const initialState = {
        lifts: [],
        current: null,
        filtered: null,
        error: null
    }

    const [state, dispatch] = useReducer(liftReducer, initialState);

    //Get Lifts
    const getLifts = async () => {
        
        try {
            const res = await axios.get('/api/lifts');
            dispatch({type: GET_LIFTS, payload: res.data})
        } catch (err) {
            dispatch({
                type: LIFT_ERROR,
                payload: err.response.msg
            })
        }
        
    }

    //Add Lift
    const addLift = async lift => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('/api/lifts', lift, config);
            dispatch({type: ADD_LIFT, payload: res.data})
        } catch (err) {
            dispatch({
                type: LIFT_ERROR,
                payload: err.response.msg
            })
        }
        
    }

    //Update Lift
    const updateLift = async lift => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.put(`/api/lifts/${lift._id}`, lift, config);
            dispatch({
                type: UPDATE_LIFT, 
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: LIFT_ERROR,
                payload: err.response.msg
            })
        }
        
    }

    //Delete Lift
    const deleteLift = async id => {
        try {
            await axios.delete(`/api/lifts/${id}`);
            dispatch({type: DELETE_LIFT, payload: id})
        } catch (err) {
            dispatch({
                type: LIFT_ERROR,
                payload: err.response.msg
            })
        }
        
    }
    //Clear lifts (on logout)
    const clearLifts = () => {
        dispatch({type: CLEAR_LIFTS});
    }

    //Set Current Lift
    const setCurrent = lift => {
        dispatch({type: SET_CURRENT, payload: lift})
    }
    //Clear Current Lift
    const clearCurrent = () => {
        dispatch({type: CLEAR_CURRENT})
    }
    
    //Filter Lifts
    const filterLifts = text => {
        dispatch({type: FILTER_LIFTS, payload: text})
    }
    //Clear Filter
    const clearFilter = () => {
        dispatch({type: CLEAR_FILTER})
    }

    return (
        <LiftContext.Provider
        value={{
            lifts: state.lifts,
            current: state.current,
            filtered: state.filtered,
            error: state.error,
            addLift,
            deleteLift,
            setCurrent,
            clearCurrent,
            updateLift,
            filterLifts,
            clearFilter,
            getLifts,
            clearLifts
        }}
        >
            {props.children}
        </LiftContext.Provider>
        )
}

export default LiftState;