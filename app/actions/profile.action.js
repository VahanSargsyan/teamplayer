export const GOT_PROFILE_DATA = 'profile/GOT_PROFILE_DATA';
function gotProfileData(json) {
    return {
        type: GOT_PROFILE_DATA,
        payload: json
    }
}

export const UPDATED_PROFILE_DATA = 'profile/UPDATED_PROFILE_DATA';
function updatedProfileData(changeField) {
    return {
        type: UPDATED_PROFILE_DATA,
        payload: changeField
    }
}

export const ERROR_UPDATING_PROFILE = 'profile/ERROR_UPDATING_PROFILE';
function errorUpdatingProfile(error) {
    return {
        type: ERROR_UPDATING_PROFILE,
        payload: error
    }
}

export const CLICK_X_ITEM = 'profile/CLICK_X_ITEM';
export function clickXItem(item, value) {
    return {
        type: CLICK_X_ITEM,
        payload: { item, value } 
    }
}

export const CLOSE_EDITABLE_ITEM = 'profile/CLOSE_EDITABLE_ITEM';
export function closeEditableItem() {
    return {
        type: CLOSE_EDITABLE_ITEM
    }
}

export const CHANGE_X_ITEM_VALUE = 'profile/CHANGE_X_ITEM_VALUE';
export function changeXItemValue(mykey, newValue) {
    let changeField = {};
    changeField[mykey] = newValue;
    return {
        type: CHANGE_X_ITEM_VALUE,
        payload: {changeField, newValue}
    }
}

export function getProfileData() {
    return dispatch => {
        fetch('/api/profile', {credentials: 'include'})
        .then(result => result.json())
        .then(json => {
             dispatch(gotProfileData(json));
        });
    }
}

export function updateProfileData(mykey, newValue) {
    return dispatch => {
        let changeField = {};
        changeField[mykey] = newValue;

        const options =  {
            method: 'PUT',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(changeField)
        };

        fetch('/api/profile', options)
        .then(result => {
            if(result.status === 200) {
                dispatch(updatedProfileData(changeField));
                dispatch(closeEditableItem());
            } else {
                dispatch(errorUpdatingProfile(result.json()));
            }
        })
    }
}

export function postProfileData(data) {
    return dispatch => {

        const options =  {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        };

        fetch('/api/profile', options)
        .then(result => {
            if(result.status === 200) {
                return result.json();
            } else {
                dispatch(errorUpdatingProfile(result.json()));
            }
        }).then(json => {
             dispatch(updatedProfileData(json));
        })
    }
}