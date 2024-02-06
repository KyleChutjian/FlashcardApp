import storage from "redux-persist/lib/storage";
const persistConfig = {
    key: "root",
    storage,
    whitelist: ["user", "collections"]
}

export default persistConfig;