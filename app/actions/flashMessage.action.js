export const ADD_FLASH_MESSAGE = 'FLASH_MESSAGE/ADD_FLASH_MESSAGE'
export const DELETE_FLASH_MESSAGE = 'FLASH_MESSAGE/DELETE_FLASH_MESSAGE'

export const addFlashMessage = (text, msgType) => {
        
    return dispatch => {
        dispatch(ADD_FLASH_MESSAGE_SUCCESS(text, msgType))
        setTimeout(()=>{
            dispatch(deleteFlashMEssage())
        },3000)
    }
}

export const ADD_FLASH_MESSAGE_SUCCESS = (text, msgType) => {
    return {
        type: ADD_FLASH_MESSAGE,
        payload: {
            text,
            msgType
        }
    }
}

export const deleteFlashMEssage = () => {
    return {type: DELETE_FLASH_MESSAGE, payload: null}
}
