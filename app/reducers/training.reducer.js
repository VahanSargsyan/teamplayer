import {CHANGE_TRAINING_STEP_SUCCESS, GET_TRAINING_DATA, CHANGE_RENDER_MESSAGE} from '../actions/training.action'

const initialStep = {
    employees: [],
    trainingStep: 0,
    renderMsg: true
}

export default(state = initialStep, action) => {
    switch (action.type) {
        case CHANGE_RENDER_MESSAGE:
            return state
        case GET_TRAINING_DATA:
            return {
                ...state,
                trainingStep: action.payload.trainingStep,
                finished: action.payload.finished,
                employees: action.payload.employees
            }
        case CHANGE_TRAINING_STEP_SUCCESS:
            return {
                ...state,
                trainingStep: action.payload,
                renderMsg: true
            }
        default:
            return state

    }
}
