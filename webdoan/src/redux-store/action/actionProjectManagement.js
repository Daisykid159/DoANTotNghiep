import Api from "../../api";
import {jwtDecode} from "jwt-decode";

export function updateData(data) {
    return {
        type: 'UPDATE_DATA',
        data
    }
}

export function actionGetListProject () {

}

export default {
    actionGetListProject,
};
