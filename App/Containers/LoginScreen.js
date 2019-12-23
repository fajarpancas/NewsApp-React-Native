import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, TouchableOpacity, Image, View, TextInput } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Colors, Images, Fonts } from '../Themes'
import PropTypes from 'prop-types'

import LoginData from '../Redux/LoginRedux'

// Styles
import styles from './Styles/LoginScreenStyle'
import { CustomInput, Icons } from 'react-native-awesome-component'


class LoginScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    postLogin: PropTypes.func
  }

  constructor(props){
    super(props)
    this.state = {
      userId : 'fajar@gmail.com',
      userIdError: true,
      showPassword: true,
      password: 'fajar12345'
    }
  }

  signUp = () => {
    alert('aaa')
  }

  logIn = () => {
    let data = {
        email: this.state.userId,
        password: this.state.password,
    };
    // alert(JSON.stringify(data))
    // alert(this.state.userId + " pass : " + this.state.password)
    // this.props.navigation.navigate('BerandaScreen')
    this.props.postLogin(data)
  }

  onChangeEmail = (text) => {
    this.setState({ userId: text })
  }

  onChangePass = (text) => {
    this.setState({ password: text })
  }

  render () {
    const { userId, password, showPassword } = this.state
    return (
      <View style = { styles.MainContainer }>
        <Image source={Images.logo_blue} style={styles.logoBlue} resizeMode='stretch' />
        <Text style={styles.loginText}>Log in to my account</Text>
        <TextInput
          style={styles.formLogin}
          placeholder="Email"
          onChangeText={(text) => this.onChangeEmail(text)}
        />
          <TextInput
          style={styles.formLogin}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => this.onChangePass(text)}
        />
           <TouchableOpacity onPress={this.logIn} style={styles.buttonLogIn}>
            <Text style={styles.buttonLogInText}>Log In</Text> 
          </TouchableOpacity>
          <Text style={styles.forgotPass}>Forgot Password?</Text>
          <View style={ styles.bottomView} >
            <Text style={styles.textSignUp}>Don't have an account? 
              <Text onPress={this.signUp} style={styles.textSignUpLink}> Sign Up</Text>
            </Text>
          </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    postLogin: data => dispatch(LoginData.loginRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
