import { createSlice } from '@reduxjs/toolkit';
import { notification_load_limit } from '../Utils/Parameters.jsx';

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState: {
        isLoading: true,
        data: [],
        error: '',
        index: notification_load_limit
    },
    reducers: {
        getNotifications: (state) => {
            state.isLoading = true;
        },
        notificationSuccess: (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.error = '';
        },
        notificationFail: (state, action) => {
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
export const { getNotifications, notificationSuccess, notificationFail, loadMore } = notificationsSlice.actions;

// Export reducer
export default notificationsSlice.reducer;
