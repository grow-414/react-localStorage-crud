import { combineReducers } from "redux";
import appReducers from "./appReducers";
import userReducers from "./userReducers";

const rootReducers = combineReducers({
    app: appReducers,
    user: userReducers
})

export default rootReducers;