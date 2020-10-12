import axios from "axios"
import SyncStorage from 'sync-storage';
import AsyncStorage from '@react-native-community/async-storage';
import {
    GET_ONLINE_USER,
    GET_CONVERSATION,
    GET_CONV_ERROR,
    ON_CONV_START,
    DELETE_CONVERSATION,
    CHANGE_LOCATION_CONFIG
} from "./type"
axios.interceptors.request.use(
    config => {
        config.headers.authorization = `Bearer ${SyncStorage.get('token')}`;
        return config
    }
)
const ip = '192.168.1.15'


// change location configration 

export const setLocationconfig = (data) => {
    console.log("````on set loation@#@#@#",data)
    return {
        type: CHANGE_LOCATION_CONFIG,
        data
    }
}
 
export const saveLocationconfig = (data) => dispatch => {

   console.log("uuuuuuuuuuuuuuuuuuuuu" ,data)

    AsyncStorage.setItem('locationConfig',data)
                    .then((d) => {
                     console.log("on async ",data)
                        dispatch(setLocationconfig( data ));
                        
                    })
                    .catch((err) => {
                        console.log("on asny error ",data,err)
                        dispatch(loading(false));
                        dispatch(error(err.message || 'ERROR'));
                    })

              
     
   
}


export const getLocationConfig = () => dispatch =>

    AsyncStorage.getItem('locationConfig')
        .then((data) => {
            console.log("for action ", data)

            dispatch(setLocationconfig(data));

        })
        .catch((err) => {

            dispatch(error(err.message || 'ERROR'));
        })


// @@@@@@22 end location config@@@@@
// @@@@@@@@@@ send message @@@@@@@@@

export const messageSendSuccess = (send) => {
    return {
        type: SEND_MESSAGE,
        send
    }
}
export const messageSendError = (error) => {
    return {
        type: SEND_MESSAGE_ERROR,
        error
    }
}
export const sendMessageToApi = (message, receiverId) => {

    return (dispatch) => {
        let params = {
            message: message,
            receiverId: receiverId
        }


        return axios.post(`http://${ip}:3333/api/chat/createChat`, params).
            then(response => {

                dispatch(messageSendSuccess(true))

            }
            ).
            catch(error => {

                dispatch(messageSendError(error.message));
            });
    }
}
//@@@@@@@@@@@@ END SEND MESSAGE @@@@@@@@@@
//@@@@@@@@@@@@@@@@ get chat Conversaion actions @@@@@@@@@@@
export const getChatconversation = (conversation) => {
    return {
        type: GET_CONVERSATION,
        conversation
    }
}
export const getChatconversationError = (error) => {
    return {
        type: GET_CONV_ERROR,
        error
    }
}
export const getChatconversationOnStart = (isLoading) => {
    return {
        type: ON_CONV_START,
        isLoading

    }
}
export const deleteConversation = () => {
    console.log("conversation deleteed")
    return {
        type: DELETE_CONVERSATION,


    }
}

export const fetchConversation = (id) => {
    console.log("B@R7434 token : ", SyncStorage.get('token'))
    return (dispatch) => {
        let params = {
            id: id
        }
        getChatconversationOnStart(true)

        return axios.post(`http://${ip}:3333/api/chat/getConversation`, params).
            then(response => {

                dispatch(getChatconversation(response.data))

            }
            ).
            catch(error => {

                dispatch(getChatconversationError(error.message));
            });
    }
}
// @@@@@@@@@@@@@@@@@@@@@END CONVERSATION@@@@@@@@@@@@@@@@@@

export const getOlineUser = (users) => {
    return {
        type: GET_ONLINE_USER,
        users
    }
}
export const fetchOnlineUser = () => {
    return (dispatch) => {



        return axios.get(`http://${ip}:3333/api/chat/viewOnlineUser`, { headers: { "Access-Control-Allow-Origin": "*", } }).
            then(response => {
                console.log("online users action ", response.data)
                dispatch(getOlineUser(response.data))

            }).
            catch(error => {


            });
    }
}




export const getToken = (token) => ({
    type: 'GET_TOKEN',
    token,
});

export const saveToken = token => ({
    type: 'SAVE_TOKEN',
    token
});

export const removeToken = (data) => ({
    type: 'REMOVE_TOKEN',
    data
});

export const loading = bool => ({
    type: 'LOADING',
    isLoading: bool,
});

export const error = error => ({
    type: 'ERROR',
    error,
});



export const getUserToken = () => dispatch =>

    AsyncStorage.getItem('userToken')
        .then((data) => {
            console.log("for action ", data)
            SyncStorage.set("token", data)
            dispatch(getToken(data));
            dispatch(loading(false));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })



export const saveUserToken = (data) => dispatch => {

    let params = {
        email: data.email,
        password: data.password
    }

    return axios.post(`http://${ip}:3333/api/user/signIn`, params).
        then(response => {
            // console.log("on respond:  ",response)
            // response data have valid toke 
            console.log(response.data.token)
            if (response.data.hasOwnProperty("token"))
                AsyncStorage.setItem('userToken', response.data.token)
                    .then((data) => {
                        dispatch(loading(false));
                        dispatch(saveToken(response.data.token));
                    })
                    .catch((err) => {
                        dispatch(loading(false));
                        dispatch(error(err.message || 'ERROR'));
                    })

            // console.log(response.data)
            // response data hava invalid data
            if (response.data.hasOwnProperty("error")) {

                dispatch(error(response.data));
                console.log("errrrrrr")
            }
        }).
        catch(error => {
            console.log("error happen :", error.message)
            dispatch(error(error.message));
        });

}
export const removeUserToken = () => dispatch =>
    AsyncStorage.removeItem('userToken')
        .then((data) => {
            console.log("for remove data ", data)
            dispatch(loading(false));
            dispatch(removeToken(null));
        })
        .catch((err) => {
            dispatch(loading(false));
            dispatch(error(err.message || 'ERROR'));
        })