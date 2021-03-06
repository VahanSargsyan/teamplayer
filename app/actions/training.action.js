export const CHANGE_TRAINING_STEP_SUCCESS = "TRAINING/CHANGE_TRAINING_STEP_SUCCESS"
export const GET_TRAINING_DATA = "TRAINING/GET_TRAINING_DATA"
export const CHANGE_RENDER_MESSAGE = "TRAINING/CHANGE_RENDER_MESSAGE"

export const changeTrainingStep = (nextStepIndex, nextStepId, finished, fn) => {
    if (finished && nextStepId != 'finished') {
        return {type: CHANGE_TRAINING_STEP_SUCCESS, payload: nextStepIndex}
    } else if(finished) {
        fn()
        return {type: 'FINISHED'}
    } else {
        const initObj = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({trainingStep: nextStepId}),
            credentials: 'include'
        }
        return dispatch => {
            fetch(`${FETCH_URL}/api/training/step`, initObj).then(result => result.json()).then(result => {
                if (nextStepId != 'finished') {
                    dispatch(changeTrainingStepSuccess(nextStepIndex))
                }
                fn()
            }).catch(error => error)
        }
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
        const getAllEmployees = fetch(`${FETCH_URL}/api/training`, {credentials: 'include'})
            .then(result => result.json())
        const getTrainingStep = fetch(`${FETCH_URL}/api/training/step`, {credentials: 'include'})
            .then(result => result.json())
        Promise.all([getAllEmployees, getTrainingStep])
        .then(result => dispatch(getTrainingDataSuccess(result)))
        .catch(error => error)

    }
}

export const getTrainingDataSuccess = data => {

    const employees = data[0]
    const finished = data[1].trainingStep === 'finished'
    const trainingStep = employees.findIndex(employee => {
        return employee._id == data[1].trainingStep
    })
    return {
        type: GET_TRAINING_DATA,
        payload: {
            employees,
            trainingStep: (trainingStep != -1) ? trainingStep : 0,
            finished
        }
    }
}
