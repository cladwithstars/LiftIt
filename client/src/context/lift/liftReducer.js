import {
    GET_LIFTS,
    ADD_LIFT,
    DELETE_LIFT,
    SET_CURRENT,
    CLEAR_CURRENT,
    UPDATE_LIFT,
    FILTER_LIFTS,
    CLEAR_FILTER,
    LIFT_ERROR,
    CLEAR_LIFTS
} from '../types'

export default (state, action) => {
    switch(action.type) {
        case GET_LIFTS: {
            return {
                ...state,
                lifts: action.payload,
                loading: false
            }
        }
        case ADD_LIFT:
            return {
                ...state, 
                lifts: [action.payload,...state.lifts],
                loading: false
            }
        case DELETE_LIFT:
            return {
                ...state,
                lifts: state.lifts.filter(lift => lift._id !== action.payload),
                loading: false
            };
        case CLEAR_LIFTS:
            return {
                ...state,
                lifts: [], 
                filtered: null,
                error: null,
                current: null
            }
        case UPDATE_LIFT:
            return {
                ...state,
                loading: false,
                lifts: state.lifts.map(lift => lift._id === action.payload._id ?
                    action.payload : lift) //only update the one being edited. Else return all else the same
            }
        case SET_CURRENT:
            return {
                ...state, 
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state, 
                current: null
            };
        case FILTER_LIFTS:
            return {
                ...state,
                filtered: state.lifts.filter(lift => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return lift.name.match(regex)
                })
            }
        case CLEAR_FILTER:
            return {
                ...state, 
                filtered: null
            };
        case LIFT_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state

    }
}

