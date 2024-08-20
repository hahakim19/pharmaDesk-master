import { GET_USER, USER_FAIL, USER_SUCCESS } from "./userTypes.jsx"

const initialState = {
    isLoading: true,
    data: {
        id: '',
        name: '',
        nif: '',
        nis: '',
        position: {
            altitude: 0,
            longtitude: 0
        },
        description: '',
        email: '',
        pictureUrl: ''
    },
    token: '',
    error: '',
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER: return {
            ...state,
            isLoading: true,
        }
        case USER_SUCCESS: return {
            ...state,
            isLoading: false,
            data: action.payload,
            error: ''
        }
        case USER_FAIL: return {
            ...state,
            isLoading: false,
            data: initialState.data,
            error: action.payload
        }
    }

    return state;
}