import  React,{useEffect,useContext} from 'react';
import { View, Text, Button, Image , FlatList, StyleSheet,ScrollView } from 'react-native';
import {connect} from 'react-redux';
import { ListItem, Avatar ,Badge} from 'react-native-elements'
import { TouchableOpacity } from 'react-native'
import { saveLocationconfig} from "../../../Action/index";
import RestartAndroid from 'react-native-restart-android'

import { MessageBox } from 'react-chat-elements/native';

import SocketContext from "../../../SocketContext"

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
  

const FlatListBasics = (props) => {
  const socket = useContext(SocketContext)

    let online=props.onlineUser.onlineUser;
    console.log("list props ",props.navigation)
  return ( 
    <ScrollView style={{ backgroundColor: "white", flex: 1 }}>
    <View>
     

    {
      online.map((l, i) => (
        <ListItem key={l.userId} button   
        onPress={() =>{console.log("i licked ",props.navigation.navigate)
 
 
          props.navigation.navigate('Chat',{
            userId:l.userId,
            
          })
        }}    bottomDivider
        Component={TouchableOpacity}
        
        >
         
          <View>
  <Avatar
    rounded
    source={{
      uri:"https://placeimg.com/150/150/any",
    }}
    size="small"
  />

  <Badge
    status="success"
    containerStyle={{ position: 'absolute',bottom:-5, right: -4 }}
  />
</View>
          <ListItem.Content>
            <ListItem.Title>{l.user.firstName}</ListItem.Title>
            <ListItem.Subtitle>{l.user.email}</ListItem.Subtitle>
          </ListItem.Content>

         
        </ListItem>
      ))
    }
   
  </View>
  </ScrollView>
  );
}



const mapDispatchToProps = dispatch => {
  return {
    saveLocationconfigs:(data)=>dispatch(saveLocationconfig(data)),
  
  }
};
const mapStateToProps=state=>({
    onlineUser:state.onlineUser,
    config:state.locationConfig,
   });
export default connect(mapStateToProps,mapDispatchToProps)(FlatListBasics);
  //  <View style={styles.container}>
  //     <FlatList
  //       data={online}
  //       renderItem={({item}) => 
  //       <ListView 
  //       title={item.user.firstName}
  //       avatar="https://placeimg.com/150/150/any"
  //       subtitle={item.user.email}
  //       style={styles.item} 
  //       >
  //            </ListView>
        
  //   }
  //     />
  //   </View>