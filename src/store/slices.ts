import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialUserState = {
    userInfo: {
        user_id: "",
        name: ""
    },
};

interface CollectionState {
    collections: string[];
};

const initialCollectionsState: CollectionState = {
    collections: []
};

type CollectionArray = {
    collections: Array<string>;
};

export const userSlice = createSlice({
    name: "user",
    initialState: initialUserState,
    reducers: {
        setLoginData: (state, action: PayloadAction<{user_id: string, name: string}>) => {
            state.userInfo.user_id = action.payload.user_id
            state.userInfo.name = action.payload.name
        }
    }
});

export const collectionsSlice = createSlice({
    name: "collections",
    initialState: initialCollectionsState,
    reducers: {
        setSelectedCollections: (state, action: PayloadAction<CollectionArray>) => {
            state.collections = action.payload.collections
        }
    }
});

export default userSlice.reducer;
export const { setLoginData } = userSlice.actions;
export const { setSelectedCollections } = collectionsSlice.actions;