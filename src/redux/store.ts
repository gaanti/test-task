import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import RootReducer from "./rootReducer";

export const store = configureStore({
     reducer: RootReducer,
     middleware: (getDefaultMiddleware) => getDefaultMiddleware()
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
     ReturnType,
     RootState,
     unknown,
     Action<string>
>;
