import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialUserState = {
    userInfo: {
        user_id: "",
        name: ""
    },
};
type CollectionSlice = {
    collections: Array<string>;
    frontFlashcard: string;
    backFlashcard: string;
};

type SelectedCollectionSlice = {
    collections: Array<string>;
};

type SelectedFrontFlashcardSlice = {
    frontFlashcard: string;
};

type SelectedBackFlashcardSlice = {
    backFlashcard: string;
};

const initialCollections: CollectionSlice = {
    collections: [],
    frontFlashcard: "",
    backFlashcard: ""
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
    initialState: initialCollections,
    reducers: {
        setSelectedCollections: (state, action: PayloadAction<SelectedCollectionSlice>) => {
            state.collections = action.payload.collections
        },
        setFrontFlashcard: (state, action: PayloadAction<SelectedFrontFlashcardSlice>) => {
            state.frontFlashcard = action.payload.frontFlashcard
        },
        setBackFlashcard: (state, action: PayloadAction<SelectedBackFlashcardSlice>) => {
            state.backFlashcard = action.payload.backFlashcard
        },
    }
});

export default userSlice.reducer;
export const { setLoginData } = userSlice.actions;
export const { setSelectedCollections, setFrontFlashcard, setBackFlashcard } = collectionsSlice.actions;