import {GET_AUTH_USER_SUCCESS} from '../actions/auth.action'
import {CHANGE_TRAINING_STEP_SUCCESS} from '../actions/training.action'

const initialState = {
    user: null,
    activeUrl: 'createProfile'
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
            return {
                ...state,
                activeUrl: action.payload.activeUrl,
                user: action.payload.user
            }
        default:
            return state
    }
}
