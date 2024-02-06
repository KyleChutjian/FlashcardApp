import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { collectionsSlice, userSlice } from './slices';
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useSelector } from 'react-redux';
import persistReducer from 'redux-persist/es/persistReducer';
import persistConfig from './persistConfig';
import persistStore from 'redux-persist/es/persistStore';

const rootReducer = combineReducers({
    user: userSlice.reducer,
    collections: collectionsSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({
            serializableCheck: false,
        })
});

export const persistor = persistStore(store);

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;