export const GET_AUTH_USER_SUCCESS = "AUTH/GET_AUTH_USER_SUCCESS"

export const getAuthUser = (fn) => {
    return dispatch => {
        fetch(`${FETCH_URL}/api/auth/user`, {credentials: 'include'})
            .then(result=>result.json())
            .then(result=>{
                dispatch(getAuthUserSuccess(result))
                fn()
            })
            .catch(error=>{
                throw error
            })
    }
}

export const getAuthUserSuccess = (result) => {
    return {
        type: GET_AUTH_USER_SUCCESS,
        payload: result
    }
}
