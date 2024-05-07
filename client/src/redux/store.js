import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import adminReducer from "./adminSlice";

const persistConfig = {
    key: "root",
    storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);
const persistedAdminReducer = persistReducer(persistConfig, adminReducer);
export const store = configureStore({
    reducer: {
        user: persistedReducer,
        admin: persistedAdminReducer,
    },
});

export const persistor = persistStore(store);
