import { getApi } from './GridFetch'

// Actions
export const GET_EMPLOYEES = 'GETTING_EMPLOYEES';


// ActionCreator
export function getEmployee(result){
    return{
        type: GET_EMPLOYEES,
        payload: result
    };
}

export function loadEmployee() {

  return function (dispatch) {
    return getApi().then(
      result => {
          console.log("RESULT,", result);
          dispatch(getEmployee(result));
      },
      error => console.log('The Sandwich Shop', error)
    );
  };
}