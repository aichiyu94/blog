
import * as Actions from "../actionTypes";
export function GetUser(data) {
    return {
        type: Actions.USER_INFO,
        data
    }
}