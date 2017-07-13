import {GET_AUTH_USER_SUCCESS} from '../actions/auth.action'
import {CHANGE_TRAINING_STEP_SUCCESS} from '../actions/training.action'

const adminEmails = ['anialaverdyan2@gmail.com']

const initialState = {
    user: null,
    activeUrl: 'createProfile',
    admin: false
}

export default(state = initialState, action) => {
    switch (action.type) {
        case CHANGE_TRAINING_STEP_SUCCESS:
            if (action.payload == null)
                return {
                    ...state,
                    activeUrl: 'team'
                }
            else
                return state
            case GET_AUTH_USER_SUCCESS:
            let isAdmin = false
                if(action.payload.user && adminEmails.includes(action.payload.user.email))
                    isAdmin = true
            return {
                ...state,
                activeUrl: action.payload.activeUrl,
                user: action.payload.user,
                admin: isAdmin
            }
        default:
            return state
    }
}
