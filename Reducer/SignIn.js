import { SIGNINSUCCESS,SIGNINERROR,SIGNININCORRECT ,SIGNOUT} from "../Action/type";
import AsyncStorage from '@react-native-community/async-storage';
// const getData = async () => {
//   try {
//     const value = await AsyncStorage.getItem('@storage_Key')
//     if(value !== null) {
//       // value previously stored
//     }
//   } catch(e) {
//     // error reading value
//   }
// }
import SyncStorage from 'sync-storage';

// import { openDatabase } from 'react-native-sqlite-storage';
// import { AsyncStorage } from 'react-native';
 
// const data=AsyncStorage.getItem('@MySuperStore:key');
// console.log("async",data)
const getStorageToken = async state => {
  try {
    const value = await AsyncStorage.getItem('token');
    if (value !== null) {
      return await JSON.parse(value);
    }
  } catch (error) {}
  return state;
};
const getStorageUserValidate = async state => {
  try {
    const value = await AsyncStorage.getItem('userValidate');
    if (value !== null) {
      return await JSON.parse(value);
    }
  } catch (error) {}
  return state;
};

 const toke=AsyncStorage.getItem('token')
 const userValidate=SyncStorage.get('userValidate')
 const defaultState = {
  token: null
};
const defaultStateUserValidate = {
  userValidate: false
};
const intialState={
    token:   getStorageToken(defaultState),
    userValidate:getStorageUserValidate(defaultStateUserValidate) ,
    error:true
}

const singInReducer= async (state=intialState,action)=>{
  switch (action.type){
        case  SIGNINSUCCESS :
          SyncStorage.set('token',  action.data.token);
          SyncStorage.set('userValidate', true);
 
          return  {
            token:action.data,
            userValidate:true,
            
            error:null


          }
        case SIGNININCORRECT:
          SyncStorage.remove("token");
          SyncStorage.remove("userValidate");
  
          // localStorage.setItem("userValidate",false)
          return {
            token:null,
            // userValidate:false,

            error:null
          }
        case SIGNINERROR :
          SyncStorage.remove("token");
          SyncStorage.remove("userValidate")
          return {
            token:null,
            // userValidate:false,
            error:action.error
          }
          case SIGNOUT:
            SyncStorage.remove("token");
          SyncStorage.remove("userValidate");
            // localStorage.setItem("userValidate",false);
            // localStorage.setItem("token",null)
            return{
              token:null,
              userValidate:false,
              signOut:"success"
              
            }

        default :return state;
                       }
}
export default singInReducer;