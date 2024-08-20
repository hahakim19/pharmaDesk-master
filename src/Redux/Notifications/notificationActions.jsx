import { GET_NOTIFICATION, NOTIFICATION_FAIL, NOTIFICATION_SUCCESS } from "./notificationTypes.jsx"

export const getNotifications = () => {
    return {
        type: GET_NOTIFICATION,
    }
}

export const notificationSuccess = data => {
    return {
        type: NOTIFICATION_FAIL,
        payload: data
    }
}

export const notificationFail = error => {
    return {
        type: NOTIFICATION_SUCCESS,
        payload: error
    }
}