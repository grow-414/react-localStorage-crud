import { APP_LOAD, LOGOUT } from "../actions";

const initialState = {
  token: "",
  user: {},
};

const appReducers = (state = initialState, action) => {
  switch (action.type) {
    case APP_LOAD:
      return {
        ...state,
        token: action.payload.token,
        user: action.payload.user,
      };
    case LOGOUT:
      return {
        token: "",
        user: {},
      };
    default:
      return {
        ...state,
      };
  }
};

export default appReducers;
