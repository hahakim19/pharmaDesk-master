import { GET_USER, USER_FAIL, USER_SUCCESS } from "./userTypes.jsx"

export const getUser = () => {
    return {
        type: GET_USER,
    }
}

export const userSuccess = data => {
    return {
        type: USER_SUCCESS,
        payload: data
    }
}

export const userFail = error => {
    return {
        type: USER_FAIL,
        payload: error
    }
}