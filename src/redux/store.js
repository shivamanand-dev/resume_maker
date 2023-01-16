import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import reduxStore from "./reduxStore";

export const makeStore = () =>
  configureStore({
    reducer: {
      reduxStore: reduxStore,
    },
    middleware: (getDefaultMiddleware) =>
      // disable warnings to store non-serializable values in the store
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActionPaths: [],
        },
      }),
  });

const store = makeStore();

export const StoreWrapper = createWrapper(makeStore, { debug: true });
export default store;
