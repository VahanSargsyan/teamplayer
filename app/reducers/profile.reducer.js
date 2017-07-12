import { GOT_PROFILE_DATA,
        UPDATED_PROFILE_DATA,
        CHANGE_X_ITEM_VALUE,
        CLICK_X_ITEM,
        CLOSE_EDITABLE_ITEM,
        ERROR_UPDATING_PROFILE } from '../actions/profile.action';

const initialState = {
    data: {
        firstName: '',
        lastName: '',
        gender: '',
        bio: '',
        email: '',
        picture: '',
        position: '',
        education: '',
        jobDescription: '',
        hobbies: [],
        fbLink: ''
    },
    editingItem: -1,
    editingValue: '',
    error: ''
}

export default function (state = initialState, {type, payload}) {
    switch (type) {
        case GOT_PROFILE_DATA:
            return {...state, data: {...payload}}
       
        case UPDATED_PROFILE_DATA:
            return {...state, data: {...state.data, ...payload}}

        case CLICK_X_ITEM:
            return {...state, editingItem: payload.item, editingValue: payload.value}
        
        case CHANGE_X_ITEM_VALUE:
            return {...state, editingValue: payload.newValue}
        
        case CLOSE_EDITABLE_ITEM:
            return {...state, editingItem: -1, editingValue: ''}
        
        case ERROR_UPDATING_PROFILE:
            return {...state, error: payload.error}
        
        default:
            return state;
    }
}