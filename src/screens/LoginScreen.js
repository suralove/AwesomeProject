import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import { useSelector, useDispatch, connect } from 'react-redux';
import { fetchSignIn, saveUserToken } from '../../Action/index';
import AsyncStorage from '@react-native-community/async-storage';

class Inputs extends Component {
   state = {
      email: '',
      password: ''
   }
   handleEmail = (text) => {
      this.setState({ email: text })
   }
   handlePassword = (text) => {
      this.setState({ password: text })
   }

   render() {
      const uSign = (e, p) => this.props.signIn(e, p)
      // console.log(this.props.sign)

      return (
         <View style={styles.container}>
            <TextInput style={styles.input}
               underlineColorAndroid="transparent"
               placeholder="Email"
               placeholderTextColor="#9a73ef"
               autoCapitalize="none"
               onChangeText={this.handleEmail} />

            <TextInput style={styles.input}
               underlineColorAndroid="transparent"
               placeholder="Password"
               placeholderTextColor="#9a73ef"
               autoCapitalize="none"
               onChangeText={this.handlePassword} />

            <TouchableOpacity
               style={styles.submitButton}
               onPress={
                  () => {
                     uSign(this.state.email, this.state.password)
                     console.log("on login", this.props.trueSign)
                  }
               }>
               <Text style={styles.submitButtonText}> Submit </Text>
            </TouchableOpacity>
            <TouchableOpacity
               style={styles.submitButton}
               onPress={
                  () => {
                     uSign(this.state.email, this.state.password)
                     console.log("on login", this.props.trueSign)
                  }
               }>
               <Text style={styles.submitButtonText}> clear </Text>
            </TouchableOpacity>
         </View>
      )
   }
}
const mapStateToProps = state => ({
   sign: state.userSignIn,
   trueSign: state.trueSignin
});
const mapDispatchToProps = (dispatch) => {
   return {
      signIn: (email, password) => dispatch(saveUserToken({ email, password }))
   }
};
export default connect(mapStateToProps, mapDispatchToProps)(Inputs)


const styles = StyleSheet.create({
   container: {
      paddingTop: 105
   },
   inputStyle: {
      flex: 1,
      color: 'white',
      height: 40,
      paddingLeft: 15,
      paddingRight: 15,
      borderWidth: 1,
      borderRadius: 30,
      borderColor: 'white',
      margin: 15,
      height: 67,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   input: {
      margin: 15,
      height: 40,
      borderColor: '#7a42f4',
      borderWidth: 1
   },
   submitButton: {
      backgroundColor: '#7a42f4',
      padding: 10,
      margin: 15,
      height: 40,
   },
   submitButtonText: {
      color: 'white'
   }
})