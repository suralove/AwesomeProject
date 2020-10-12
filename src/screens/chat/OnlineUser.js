import   React,{useContext,useEffect} from 'react';
import { View, Text, Button, Image , FlatList, StyleSheet} from 'react-native';
import {fetchSignIn,removeUserToken,fetchOnlineUser} from '../../../Action/index';
import { NavigationContainer } from '@react-navigation/native';
import { MessageBox } from 'react-chat-elements/native';

import { createStackNavigator } from '@react-navigation/stack';
import {connect,useDispatch} from 'react-redux';
import OnlineList from "./OnlineList"
import SocketContext from '../../../SocketContext'
import ChatUi from  "./ChatUi"
const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
});


const Stack = createStackNavigator();

function HomeScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      
<MessageBox
    position={'left'}
    type={'photo'}
    text={'react.svg'}
    data={{
        uri: 'https://facebook.github.io/react/img/logo.svg',
        status: {
            click: false,
            loading: 0,
        }
    }}/>
      <Text>Home Screen</Text>
    </View>
  );
}
 

function App(props) {
  const socket = useContext(SocketContext)
    const dispatch=useDispatch()
    console.log("nav props" ,props)
    let online=props.onlineUser.onlineUser;
    online.map(i=>{
        console.log(i)
    })
  
    useEffect(()=>{
      console.group("online user socket ",socket)
      socket.on("update", () => {
        console.log("new user login ")
        setTimeout(() => {
          dispatch(fetchOnlineUser())
    
    
        }, 4000)
    
      })
    },[])
    
  return (
 
 
      <Stack.Navigator>
        <Stack.Screen
          name="Online"

          component={OnlineList}
       
        />
          {/* <Stack.Screen
          name="Chat"
           
          component={ChatUi}
       
        /> */}
      </Stack.Navigator>
 
  );
}
const mapStateToProps=state=>({
    onlineUser:state.onlineUser
   });
export default connect(mapStateToProps)(App);
