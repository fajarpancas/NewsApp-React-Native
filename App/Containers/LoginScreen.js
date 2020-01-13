import React, { Component } from 'react'
import { Icon, Text, ActivityIndicator, TouchableOpacity, Image, View, TextInput, Button } from 'react-native'
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
import { GoogleSignin, statusCodes } from '@react-native-community/google-signin';
// import { GoogleSignin, statusCodes, GoogleSigninButton  } from '@react-native-community/google-signin';
import firebase from 'react-native-firebase'

class LoginScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    postLogin: PropTypes.func,
    fbLogin: PropTypes.func,
    googleLogin : PropTypes.func,
    register: PropTypes.func
  }

  constructor(props) {
    super(props)
    this.state = {
      userId: '',
      userIdError: true,
      showPassword: true,
      showConfirmPassword: true,
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

    GoogleSignin.hasPlayServices({ autoResolve: true }).then(() => {
      //available
    }).catch((err) => {
      console.log(error)
    })

    GoogleSignin.configure({
      scopes: ["https://www.googleapis.com/auth/drive.readonly"], // what API you want to access on behalf of the user, default is email and profile
      webClientId: '780350153808-3fukj3dsl7ucap5ceqe1spiohib2ge6t.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      // offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
      // hostedDomain: '', // specifies a hosted domain restriction
      // loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
      // forceConsentPrompt: true, // [Android] if you want to show the authorization prompt at each login.
      // accountName: '', // [Android] specifies an account name on the device that should be used
      androidClientId: '780350153808-j82obt8vbgvd8b64vvu8kevm2c7ad7va.apps.googleusercontent.com', // [iOS] optional, if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
    })
  }

  signUp = () => {
    this.setState({
      signUp: !this.state.signUp,
      nameError: null,
      passError: null,
      confirmPassError: null,
      showConfirmPassword: true,
      showPassword: true,
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
    else if (correctEmail) {
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
      // await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // alert(JSON.stringify(userInfo.user.id))
      // this.setState({ userInfo });
      const data = {
        loginType: 'google',
        email: userInfo.user.email,
        id: userInfo.user.id
      } 
      this.props.googleLogin(data)
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        // alert('a')
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        // alert('b')
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // alert('c')
        // play services not available or outdated
      } else {
        alert(error)

        // some other error happened
      }
    }
  };

  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  facebookCallback = (error, result) => {
    if (error) {
      console.log('Error fetching data:', error);
    } else {
      let data = {
        // omniauth: {
        loginType: 'facebook',
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

  showPass = () => {
    this.setState({
      showPassword: !this.state.showPassword
    })
  }

  showConfirmPass = () => {
    this.setState({
      showConfirmPassword: !this.state.showConfirmPassword
    })
  }

  render() {
    const {
      userId,
      password,
      confirmPass,
      showPassword,
      showConfirmPassword,
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
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.passInput}
            placeholder="Password"
            returnKeyType="next"
            value={userId}
            placeholder="Email"
            onChangeText={(text) => this.onChangeEmail(text)}
            underlineColorAndroid="transparent"
          />
        </View>
        {!!nameError && (
          <Text style={styles.dangerText}>{nameError}</Text>
        )}
        <View style={styles.SectionStyle}>
          <TextInput
            style={styles.passInput}
            placeholder="Password"
            value={password}
            returnKeyType="next"
            maxLength={15}
            secureTextEntry={showPassword}
            onChangeText={(text) => this.onChangePass(text)}
            underlineColorAndroid="transparent"
          />
          <TouchableOpacity onPress={() => this.showPass()}>
            {
              showPassword ?
                <Image
                  source={Images.eye}
                  style={styles.ImageStyle}
                /> :
                <Text style={{ marginRight: 15 }}>Hide</Text>
            }
          </TouchableOpacity>

        </View>

        {!!passError && (
          <Text style={styles.dangerText}>{passError}</Text>
        )}

        {signUp ?
          <View style={styles.SectionStyle}>
            <TextInput
              style={styles.passInput}
              placeholder="Confirm Password"
              value={confirmPass}
              returnKeyType="next"
              maxLength={15}
              secureTextEntry={showConfirmPassword}
              onChangeText={(text) => this.onChangeConfirmPass(text)}
              underlineColorAndroid="transparent"
            />
            <TouchableOpacity onPress={() => this.showConfirmPass()}>
              {
                showConfirmPassword ?
                  <Image
                    source={Images.eye}
                    style={styles.ImageStyle}
                  /> :
                  <Text style={{ marginRight: 15 }}>Hide</Text>
              }
            </TouchableOpacity>
          </View>
          : null
        }
        {!!confirmPassError && (
          <Text style={styles.dangerText}>{confirmPassError}</Text>
        )}


        {submit ? <ActivityIndicator size="small" style={{ margin: 10 }}></ActivityIndicator> :
          <TouchableOpacity onPress={() => {
            if (signUp) {
              if (userId === '' && password === '' && confirmPass === '') {
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
          <TouchableOpacity onPress={this.loginWithFb}>
            <View style={styles.SectionStyleBtn}>
              <Image
                source={Images.facebook}
                style={styles.ImageStyleBtn}
              />
              <Text
                style={styles.buttonFb}>
                <Text style={styles.loginFbText}>Login with Facebook</Text>
              </Text>
            </View>
          </TouchableOpacity>
        }
        {signUp ? null :
          <TouchableOpacity onPress={this.signIn}>
            <View style={styles.SectionStyleBtnGoogle}>
              <Image
                source={Images.google}
                style={styles.ImageStyleBtn}
              />
              <Text
                style={styles.buttonGoogle}>
                <Text style={styles.loginGoogle}>Login with Google</Text>
              </Text>
            </View>
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
    fbLogin: data => dispatch(LoginData.facebookLoginRequest(data)),
    googleLogin: data => dispatch(LoginData.googleLoginRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)
