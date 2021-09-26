import { configureStore } from '@reduxjs/toolkit';
import dataReducer from './dataSlice';
import clockReducer from './clockSlice';

export default configureStore({
    reducer: {
        data: dataReducer,
        clock: clockReducer,
    }
})
