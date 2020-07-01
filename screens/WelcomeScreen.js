import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity,TextInput, Alert } from 'react-native';
import db from '../config';
import firebase from 'firebase';

export default class WelcomeScreen extends Component {
  constructor(){
    super()
    this.state={
      email : '',
      password: ''
    }
  }

  userLogin = (email, password)=>{
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(()=>{
      return Alert.alert("Successfully Login")
    })
    .catch((error)=> {
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    })
  }

  userSignUp = (email, password) =>{
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((response)=>{
      return Alert.alert("User Added")
    })
    .catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      return Alert.alert(errorMessage)
    });
  }


  render(){
    return(
      <View style={styles.container}>
        <View style={{flex:1}}>
          <View style={{alignItems:'center'}}>
            <TextInput
            placeholder="abc@example.com"
            style={styles.loginBox}
            keyboardType ='email-address'
            onChangeText={(text)=>{
              this.setState({
                email: text
              })
            }}
            />
          </View>
          <View style={{alignItems:'center'}}>
            <TextInput
              style={styles.loginBox}
              placeholder="password"
              secureTextEntry = {true}
              onChangeText={(text)=>{
                this.setState({
                  password: text
                })
              }}
            />
          </View>
          <View style={{alignItems:'center'}}>
            <TouchableOpacity
              style={[styles.button,{marginBottom:10}]}
              onPress = {()=>{this.userLogin(this.state.email, this.state.password)}}
              >
              <Text style={{color:'#ff5722', fontSize:18, fontWeight:'bold'}}>LOGIN</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={()=>{this.userSignUp(this.state.email, this.state.password)}}
              >
              <Text style={{fontSize:18, fontWeight:'bold'}}>SIGN UP</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:'#ffe0b2'
  },
  
  
  loginBox:{
    width: 300,
    height: 35,
    borderBottomWidth: 1.5,
    borderColor:'#ffab91',
    fontSize: 20,
    marginBottom:20,
    marginTop:5

  },
  button:{
    width:75,
    height:50,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    backgroundColor:"#ffff",
    elevation:10
  },
    
  
})
