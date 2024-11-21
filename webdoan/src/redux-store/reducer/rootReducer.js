import { combineReducers } from 'redux';
import reducerAuth from "./reducerAuth";
import reducerPersonnelManagement from "./reducerPersonnelManagement";

const rootReducer = combineReducers({
    reducerAuth: reducerAuth,
    reducerPersonnelManagement: reducerPersonnelManagement,
});

export default rootReducer;
