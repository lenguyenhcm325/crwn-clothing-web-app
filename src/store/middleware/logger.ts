import { AnyAction } from "redux";
import { Middleware } from "redux";

import { RootState } from "../store";

const loggerMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action: AnyAction) => {
    if (!action.type) {
      return next(action);
    }

    console.log("type", action.type);
    console.log("payload", action.payload);
    console.log("currentState", store.getState());

    next(action);

    console.log("next state: ", store.getState());
  };
