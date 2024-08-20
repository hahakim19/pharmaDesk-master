import { GET_NOTIFICATION, NOTIFICATION_FAIL, NOTIFICATION_SUCCESS } from "./notificationTypes.jsx"

const initialState = {
    isLoading: true,
    data: {
        id: '',
        timestamp: '',
        content: ''
    },
    error: '',
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_NOTIFICATION: return {
            ...state,
            isLoading: true,
        }
        case NOTIFICATION_SUCCESS: return {
            ...state,
            isLoading: false,
            data: action.payload,
            error: ''
        }
        case NOTIFICATION_FAIL: return {
            ...state,
            isLoading: false,
            data: initialState.data,
            error: action.payload
        }
    }

    return state;
}