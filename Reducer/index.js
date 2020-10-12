import {combineReducers} from "redux"
import userSignIn from "./SignIn"
import trueSignin from "./TrueSignIn"
import onlineUser from "./getonlineUser"
import conversation from "./getChatConverstaion"
import locationConfig from "./locationConfigration"
const reducers=combineReducers({
    userSignIn,
    trueSignin,
    onlineUser,
    conversation,
    locationConfig
})
export default reducers;