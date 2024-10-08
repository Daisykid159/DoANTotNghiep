import { combineReducers } from 'redux';
import reducerAuth from "./reducerAuth";

const rootReducer = combineReducers({
    reducerAuth: reducerAuth,
});

export default rootReducer;
