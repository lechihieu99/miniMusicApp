import { configureStore } from '@reduxjs/toolkit';
import musicReducer from '../slice/music.slice';
export const store = configureStore({
    reducer: {
        music: musicReducer
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})