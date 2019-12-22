import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, TouchableOpacity, Image, View, TextInput } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Colors, Images, Fonts } from '../Themes'

// Styles
import styles from './Styles/LoginScreenStyle'
import { CustomInput, Icons } from 'react-native-awesome-component'


class LoginScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      userId : '',
      userIdError: true,
      showPassword: true,
      password: ''
    }
  }

  signUp = () => {
    alert('aaa')
  }

  logIn = () => {
    this.props.navigation.navigate('BerandaScreen')
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
        />
          <TextInput
          style={styles.formLogin}
          placeholder="Password"
          secureTextEntry={true}
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
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
