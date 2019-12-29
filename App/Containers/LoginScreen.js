import React, { Component } from 'react'
import { ScrollView, Text, ActivityIndicator, TouchableOpacity, Image, View, TextInput, Button } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import { Colors, Images, Fonts } from '../Themes'
import PropTypes from 'prop-types'

import LoginData from '../Redux/LoginRedux'

// Styles
import styles from './Styles/LoginScreenStyle'
import { CustomInput, Icons } from 'react-native-awesome-component'
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';
// import { GoogleSignin, statusCodes, GoogleSigninButton  } from '@react-native-community/google-signin';
// import firebase from 'react-native-firebase'

class LoginScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    postLogin: PropTypes.func,
    fbLogin: PropTypes.func,
    register: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      userIdError: true,
      showPassword: true,
      password: '',
      confirmPass: '',
      accessToken: '',
      signUp: false,
      submit: false,
      nameError: null,
      passError: null,
      confirmPassError: null,
      correctEmail: false
    }
  }

  componentDidMount() {
    this.setState({
      signUp: false,
      nameError: null,
      passError: null,
      confirmPassError: null,
      password: '',
      userId: '',
      confirmPass: ''
    })
  }

  signUp = () => {
    this.setState({
      signUp: !this.state.signUp,
      nameError: null,
      passError: null,
      confirmPassError: null,
      password: '',
      userId: '',
      confirmPass: ''
    })
  }

  logIn = () => {
    const { signUp, correctEmail, password, confirmPass } = this.state
    this.setState({ submit: true })

    if (!correctEmail) {
      alert('Email is Not Correct')
    }

    if (signUp && password !== confirmPass) {
      alert('Password and Confirm Password not match')
      this.setState({ submit: false })
    }
    else {
      let data = {
        email: this.state.userId,
        password: this.state.password,
      };
      if (this.state.signUp) {
        this.props.register(data)
      }
      else if (!this.state.signUp) {
        this.props.postLogin(data)
      }
    }
    setTimeout(() => {
      this.setState({ submit: false })
    }, 2000);
  }

  onChangeEmail = (text) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (reg.test(text) === false) {
      this.setState({
        userId: text,
        nameError: 'Email is Not Correct',
        correctEmail: false
      })
    } else {
      this.setState({
        userId: text,
        nameError: null,
        correctEmail: true
      })
    }
  }

  onChangePass = (text) => {
    this.setState({
      password: text,
      passError: null
    })
  }

  onChangeConfirmPass = (text) => {
    this.setState({
      confirmPass: text,
      confirmPassError: null
    })
  }

  signIn = async () => {
    try {
      // add any configuration settings here:
      await GoogleSignin.configure();

      const data = await GoogleSignin.signIn();

      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken)
      // login with credential
      const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
      alert(`token : ${JSON.stringify(firebaseUserCredential)}`)
      console.log(JSON.stringify(firebaseUserCredential.user.toJSON()));
    } catch (e) {
      console.log("cancel");
      console.log(data)
    }
  };

  facebookCallback = (error, result) => {
    if (error) {
      console.log('Error fetching data:', error);
    } else {
      let data = {
        // omniauth: {
        email: result.email,
        name: result.name,
        token: this.state.accessToken,
        token_secret: this.state.accessToken,
        uid: result.id,
        // },
      };
      // alert(`data : ${JSON.stringify(data)}`)
      this.props.fbLogin(data);
    }
  };

  loginWithFb = () => {
    LoginManager.logInWithPermissions([
      'public_profile',
      'email',
    ]).then(
      result => {
        if (result.isCancelled) {
          console.log('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            this.setState({ accessToken: data.accessToken });
            const infoRequest = new GraphRequest(
              '/me?fields=name,picture,email',
              null,
              this.facebookCallback,
            );
            new GraphRequestManager()
              .addRequest(infoRequest)
              .start();
          });
        }
      },
      error => {
        console.log('Login fail with error:', error);
      },
    )
  }

  render() {
    const {
      userId,
      password,
      confirmPass,
      showPassword,
      signUp,
      nameError,
      passError,
      confirmPassError,
      submit
    } = this.state

    return (
      <View style={styles.MainContainer}>
        <Image source={Images.logo_blue} style={styles.logoBlue} resizeMode='stretch' />
        <Text style={styles.loginText}>{signUp ? 'Sign up' : 'Log in to my account'}</Text>
        <TextInput
          style={styles.formLogin}
          returnKeyType="next"
          value={userId}
          placeholder="Email"
          onChangeText={(text) => this.onChangeEmail(text)}
        />
        {!!this.state.nameError && (
          <Text style={styles.dangerText}>{nameError}</Text>
        )}
        <TextInput
          style={styles.formLogin}
          placeholder="Password"
          value={password}
          returnKeyType="next"
          maxLength={15}
          secureTextEntry={true}
          onChangeText={(text) => this.onChangePass(text)}
        />
        {!!passError && (
          <Text style={styles.dangerText}>{passError}</Text>
        )}

        {this.state.signUp ?
          <TextInput
            style={styles.formLogin}
            returnKeyType="next"
            value={confirmPass}
            maxLength={15}
            placeholder="Confirm Password"
            secureTextEntry={true}
            onChangeText={(text) => this.onChangeConfirmPass(text)}
          /> : null
        }
        {!!confirmPassError && (
          <Text style={styles.dangerText}>{thisconfirmPassError}</Text>
        )}

        {submit ? <ActivityIndicator size="small" style={{ margin: 10 }}></ActivityIndicator> :
          <TouchableOpacity onPress={() => {
            if (signUp) {
              if (userId === '' && password === '' && state.confirmPass === '') {
                this.setState(() => ({ nameError: "*Email required." }));
                this.setState(() => ({ passError: "*Password required." }));
                this.setState(() => ({ confirmPassError: "*Confirm Password required." }));
              } else if (userId !== '' && password === '' && confirmPass === '') {
                this.setState(() => ({ passError: "*Password required." }));
                this.setState(() => ({ confirmPassError: "*Confirm Password required." }));
                this.setState(() => ({ nameError: null }));
              } else if (password !== '' && userId === '' && confirmPass === '') {
                this.setState(() => ({ nameError: "*Email required." }));
                this.setState(() => ({ confirmPassError: "*Confirm Password required." }));
                this.setState(() => ({ passError: null }));
              } else if (confirmPass !== '' && userId === '' && password === '') {
                this.setState(() => ({ nameError: "*Email required." }));
                this.setState(() => ({ passError: "*Password required." }));
                this.setState(() => ({ confirmPassError: null }));
              } else if (confirmPass !== '' && userId !== '' && password === '') {
                this.setState(() => ({ nameError: null }));
                this.setState(() => ({ passError: "*Password required." }));
                this.setState(() => ({ confirmPassError: null }));
              } else if (confirmPass !== '' && userId === '' && password !== '') {
                this.setState(() => ({ nameError: "*Email required." }));
                this.setState(() => ({ passError: null }));
                this.setState(() => ({ confirmPassError: null }));
              } else if (confirmPass === '' && userId !== '' && password !== '') {
                this.setState(() => ({ nameError: null }));
                this.setState(() => ({ passError: null }));
                this.setState(() => ({ confirmPassError: "*Confirm Password required." }));
              } else {
                this.setState(() => ({ nameError: null }));
                this.setState(() => ({ passError: null }));
                this.setState(() => ({ confirmPassError: null }));
                this.logIn()
              }
            } else {
              if (userId === '' && password === '') {
                this.setState(() => ({ nameError: "*Email required." }));
                this.setState(() => ({ passError: "*Password required." }));
              } else if (userId !== '' && password === '') {
                this.setState(() => ({ passError: "*Password required." }));
                this.setState(() => ({ nameError: null }));
              } else if (password !== '' && userId === '') {
                this.setState(() => ({ nameError: "*Email required." }));
                this.setState(() => ({ passError: null }));
              } else {
                this.setState(() => ({ nameError: null }));
                this.setState(() => ({ passError: null }));
                this.logIn()
              }
            }
          }} style={styles.buttonLogIn}>
            <Text style={styles.buttonLogInText}>{signUp ? 'Sign Up' : 'Log In'}</Text>
          </TouchableOpacity>
        }
        <Text style={styles.forgotPass}>{signUp ? null : 'Forgot Password ?'}</Text>
        {signUp ? null :
          <TouchableOpacity
            style={styles.buttonFb}
            onPress={this.loginWithFb}>
            <Text style={styles.loginFbText}>Login with Facebook</Text>
          </TouchableOpacity>
        }
        {this.state.signUp ? null :
          <TouchableOpacity
            style={styles.buttonGoogle}
            onPress={this.signIn}>
            <Text style={styles.loginGoogle}>Login with Google</Text>
          </TouchableOpacity>
        }
        <View style={styles.bottomView}>
          <Text style={styles.textSignUp}>{signUp ? 'Have an account? ' : 'Dont have an account? '}
            <Text onPress={this.signUp} style={styles.textSignUpLink}> {signUp ? 'Log In' : 'Sign Up'} </Text>
          </Text>
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state) => {
  // alert(JSON.stringify(state.login))
  return {
    loginData: state.login.login,
    signUpData: state.login.signUp,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    register: data => dispatch(LoginData.signUpRequest(data)),
    postLogin: data => dispatch(LoginData.loginRequest(data)),
    fbLogin: data => dispatch(LoginData.facebookLoginRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
