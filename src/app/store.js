
import { configureStore } from '@reduxjs/toolkit';
import { dashboardSlice } from '../components/Dashboard/DashboardSlice';
import {logger} from 'redux-logger';
export default configureStore({
    reducer: {
        dashboard:dashboardSlice.reducer   
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: process.env.NODE_ENV !== 'production',

});
