export const CHANGE_TRAINING_STEP_SUCCESS = "training/CHANGE_TRAINING_STEP_SUCCESS"
export const GET_TRAINING_DATA = "training/GET_TRAINING_DATA"
export const CHANGE_RENDER_MESSAGE = "training/CHANGE_RENDER_MESSAGE"

export const changeTrainingStep = (nextStepIndex, nextStepId, fn) => {
    const _id = 2
    const initObj = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({trainingStep: nextStepId}),
        credentials: 'include'
    }
    return dispatch => {
        fetch('http://localhost:8081/api/training/step', initObj)
        .then(result => result.json())
        .then(result => {
            dispatch(changeTrainingStepSuccess(nextStepIndex))
            fn()
        })
        .catch(error => error)
    }

}

export const changeRenderMsg = val => {
    return {type: CHANGE_RENDER_MESSAGE, payload: val}
}
export const changeTrainingStepSuccess = nextStepIndex => {
    return {type: CHANGE_TRAINING_STEP_SUCCESS, payload: nextStepIndex}
}

export const getTrainingData = () => {
    return dispatch => {
        const getAllEmployees = fetch('http://localhost:8081/api/training', {credentials: 'include'})
            .then(result => result.json())
        const getTrainingStep = fetch('http://localhost:8081/api/training/step', {credentials: 'include'})
            .then(result => result.json())
        Promise.all([getAllEmployees, getTrainingStep])
        .then(result => dispatch(getTrainingDataSuccess(result)))
        .catch(error => error)

    }
}

export const getTrainingDataSuccess = data => {

    const employees = data[0]
    const trainingStep = employees.findIndex(employee => {
        return employee._id == data[1].trainingStep
    })
    return {
        type: GET_TRAINING_DATA,
        payload: {
            employees,
            trainingStep: (trainingStep != -1) ? trainingStep : 0
        }
    }
}
