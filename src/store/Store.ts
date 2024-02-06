import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { userSlice } from './userSlice';
import { configureStore } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux';

export const store = configureStore({
    reducer: {
        user: userSlice.reducer
    }
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;