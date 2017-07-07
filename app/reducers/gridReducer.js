import {GET_EMPLOYEES} from '../actions/GridActions'

const initialState = {
    users: [],
    modal: false
}

export default function(state = initialState, action){
    const {type} = action;

    switch (type){
        case GET_EMPLOYEES:
            return {...state, users: action.payload}
        default:
            return state;
    }
}