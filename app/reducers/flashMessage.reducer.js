import {ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE} from '../actions/flashMessage.action'

export default(state = null, action) => {
    switch (action.type) {
        case ADD_FLASH_MESSAGE:
            return action.payload
        case DELETE_FLASH_MESSAGE:
            return null
        default:
            return state
    }
}
