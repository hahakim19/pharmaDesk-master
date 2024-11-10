import { createSlice } from '@reduxjs/toolkit';
import { notification_load_limit } from '../Utils/Parameters.jsx';

const confirmedNotificationsSlice = createSlice({
    name: 'confirmedNotifications',
    initialState: {
        isLoading: true,
        data: [],
        error: '',
        index: notification_load_limit
    },
    reducers: {
        getConfirmedNotifications: (state) => {
            state.isLoading = true;
        },
        confirmedNotificationSuccess: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = '';
        },
        confirmedNotificationFail: (state, action) => {
            state.isLoading = false;
            state.data = [];
            state.error = action.payload;
        },
        loadMore: (state, action) => {
            state.data = state.data.slice(0, action.payload + notification_load_limit);
            state.index = action.payload + state.index;
        },
    },
});

// Export actions
export const { getConfirmedNotifications, confirmedNotificationSuccess, confirmedNotificationFail, loadMore } = confirmedNotificationsSlice.actions;

// Export reducer
export default confirmedNotificationsSlice.reducer;
