
import React, { useState, useEffect, useContext } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import initialMessages from './messages';
import {View,Text } from "react-native"
import SocketContext from "../../../SocketContext"
import { renderInputToolbar, renderActions, renderComposer, renderSend } from './InputToolbar';
import {
  renderAvatar,
  renderBubble,
  renderSystemMessage,
  renderMessage,
  renderMessageText,
  renderCustomView,

  renderImage
} from './MessageContainer';
import { fetchConversation, sendMessageToApi,deleteConversation } from "../../../Action/index"
import RNFS from 'react-native-fs'
import { connect, useDispatch } from 'react-redux';



function Chats(props) {
  const socket = useContext(SocketContext)

    const { userId } = props.route.params;
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
 ;


  useEffect(() => {
    props.deletePreconv()
    
    props.getConversation(userId)
 
    console.log("chat user id ",userId)
    let m = props.conversation.conversation
    let mData = []
    let r2=  {
      _id: userId,
      text: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
      createdAt: new Date(Date.UTC(2016, 5, 15, 17, 20, 0)),
      user: {
        _id: 2,
        name: 'React Native',
        avatar: 'https://placeimg.com/140/140/any',
      },
      quickReplies: {
        type: 'checkbox', // or 'radio',
        values: [
          {
            title: 'Yes',
            value: 'yes',
          },
          {
            title: 'Yes, let me show you with a picture!',
            value: 'yes_picture',
          },
          {
            title: 'Nope. What?',
            value: 'no',
          },
        ],
      },
    }
    let replay ={
      _id: userId,
      text: 'This is a quick reply. Do you love Gifted Chat? (checkbox)',
      createdAt: new Date(),
      quickReplies: {
        type: 'checkbox', // or 'radio',
        values: [
          {
            title: 'Yes',
            value: 'yes',
          },
          {
            title: 'Yes, let me show you with a picture!',
            value: 'yes_picture',
          },
          {
            title: 'Nope. What?',
            value: 'no',
          },
        ],
      }
    
    
    }
    console.log("socket ", socket)
    setTimeout(() => {
      m.map((i) => {
        let data = {
          _id: i.id,
          text: i.message,
          user: {
            _id: i.senderId,
            avatar: 'https://placeimg.com/140/140/people'
          }
        }

        console.log("copy data ", data)
        mData.push(data)
      },300)
    
      setMessages(mData.reverse());
    }, 500)

    // console.log("new props @@@@@@@@@@ ", props.conversation.conversation)
    // props.conversation.conversation.map(i => console.log(i))



  }, [userId])


  const onSend = (newMessages = []) => {
    console.log("ral twer", newMessages[0].text)
    console.log("new conig ",props.config)
    newMessages[0].image = "https://placeimg.com/150/150/any"
    //  newMessages.image="https://placeimg.com/150/150/any"
    props.sendChat(newMessages[0].text, userId)
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));
    socket.emit('setmssg', userId)
    console.log("added ", newMessages)
    console.log("mesages ", messages)
  };
 
  return (
    <GiftedChat
      messages={messages}
      text={text}
      onInputTextChanged={setText}
      onSend={onSend}
      user={{
        _id: 1,
        name: 'Aaron',
        avatar: 'https://placeimg.com/150/150/any',
      }}
      multiline={true}
      alignTop
       
      loadEarlier={true}
   

      alwaysShowSend
      scrollToBottom
      showUserAvatar
      renderAvatarOnTop
      renderUsernameOnMessage
      bottomOffset={26}
      onPressAvatar={console.log}
      renderInputToolbar={renderInputToolbar}
      renderActions={renderActions}
      renderComposer={renderComposer}
      renderSend={renderSend}
      renderAvatar={renderAvatar}
      renderBubble={renderBubble}
      renderSystemMessage={renderSystemMessage}
      renderMessage={renderMessage}
      renderMessageText={renderMessageText}
      // renderMessageImage
      renderCustomView={renderCustomView}
      isCustomViewBottom
      // isLoadingEarlier ={true}
      renderImage
      imageProps='https://placeimg.com/150/150/any'
      parsePatterns={(linkStyle) => [
        {
          pattern: /#(\w+)/,
          style: linkStyle,
          onPress: (tag) => console.log(`Pressed on hashtag: ${tag}`),
        },
      ]}
    />
  );
};
const mapStateToProps = state => ({
  conversation: state.conversation,
  onlineUser: state.onlineUser,
  config:state.locationConfig,
})
const mapDispatchToProps = (dispatch) => {
  return {
    deletePreconv:()=>dispatch(deleteConversation()),
    sendChat: (text, uid) => dispatch(sendMessageToApi(text, uid)),
    getConversation: (userId) => dispatch(fetchConversation(userId))
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Chats);
 