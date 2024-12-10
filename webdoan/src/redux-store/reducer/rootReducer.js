import { combineReducers } from 'redux';
import reducerAuth from "./reducerAuth";
import reducerPersonnelManagement from "./reducerPersonnelManagement";
import reducerDepartmentManagement from "./reducerDepartmentManagement";

const rootReducer = combineReducers({
    reducerAuth: reducerAuth,
    reducerPersonnelManagement: reducerPersonnelManagement,
    reducerDepartmentManagement: reducerDepartmentManagement,
});

export default rootReducer;
