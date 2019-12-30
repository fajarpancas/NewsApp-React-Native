import { StyleSheet, Dimensions } from 'react-native'
import { ApplicationStyles, Fonts, Colors } from '../../Themes/'
import Scale from '../../Transforms/Scale'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  MainContainer:
  {
    flex: 1,
  },
  dangerText: {
    color: 'red',
    marginLeft: 20,
    marginTop: 0,
    fontFamily: Fonts.type.SPF,
    fontSize: Fonts.size.medium
  },
  logoBlue: {
    width: Scale(160),
    height: 38.81,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: '13%',
    marginBottom: '7%'
  },
  loginText: {
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.input,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: 'black',
    marginBottom: 10,
    marginTop: 10
  },
  buttonLogIn: {
    backgroundColor: Colors.buttonLog,
    height: 48,
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 15,
    width: Dimensions.get('window').width * 0.89,
    alignSelf: 'center'
  },
  buttonLogInText: {
    color: Colors.snow,
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: 55,
    fontFamily: Fonts.type.SPF,
    fontWeight: 'bold',
    fontSize: Fonts.size.loginButton
  },
  forgotPass: {
    color: Colors.buttonLog,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '15%'
  },
  textSignUpLink: {
    color: Colors.buttonLog,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: 'bold'
  },
  bottomView: {
    width: '100%',
    height: 50,
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: Dimensions.get('window').height * 0.89,
    alignSelf: 'flex-end',
    color: 'black',
    fontFamily: Fonts.type.SPF,
    fontSize: Fonts.size.medium
  },
  buttonFb: {
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5
  },
  loginFbText: {
    color: Colors.snow,
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: 30,
    fontFamily: Fonts.type.SPF,
    fontWeight: 'bold',
    fontSize: Fonts.size.loginButton
  },
  buttonGoogle: {
    alignSelf: 'center',
    padding: 10,
    borderRadius: 5
  },
  loginGoogle: {
    color: '#ea4335',
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: 30,
    fontWeight: 'bold',
    fontFamily: Fonts.type.SPF,
    fontSize: Fonts.size.loginButton
  },
  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 48,
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.89,
    alignSelf: 'center',
    marginTop: 10,
    paddingLeft: 15,
    fontFamily: Fonts.type.SPF,
    fontSize: Fonts.size.loginButton
  },
  SectionStyleBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3b5998',
    borderWidth: 1,
    borderColor: 'lightgrey',
    height: 48,
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.89,
    alignSelf: 'center',
    marginBottom: 10,
    paddingLeft: 15,
    fontFamily: Fonts.type.SPF,
    fontSize: Fonts.size.loginButton
  },
  SectionStyleBtnGoogle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.snow,
    borderWidth: 1,
    borderColor: '#ea4335',
    height: 48,
    borderRadius: 5,
    width: Dimensions.get('window').width * 0.89,
    alignSelf: 'center',
    marginBottom: 5,
    paddingLeft: 15,
    fontFamily: Fonts.type.SPF,
    fontSize: Fonts.size.loginButton
  },
  ImageStyle: {
    padding: 10,
    margin: 5,
    marginRight: 15,
    height: 20,
    width: 20,
    resizeMode: 'stretch',
    alignSelf: 'flex-end'
  },
  ImageStyleBtn: {
    padding: 10,
    height: 30,
    width: 30
  },
  passInput: {
    flex: 1,
  }
})
