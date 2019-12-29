import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors } from '../../Themes/'
import Scale from '../../Transforms/Scale'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  MainContainer:
  {
    flex: 1,
  },
  dangerText:{
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
  loginText:{
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.input,
    fontWeight: 'bold',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: 'black'
  },
  buttonLogIn: {
    backgroundColor: Colors.buttonLog,
    height: 48,
    marginTop: '3%',
    marginBottom: '4%',
    marginLeft: 20,
    marginRight: 20
  },
  buttonLogInText:{
    color: Colors.snow,
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: 55,
    fontFamily: Fonts.type.SPF,
    fontWeight: 'bold',
    fontSize: Fonts.size.loginButton
  },
  forgotPass:{
    color: Colors.buttonLog,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: '4%'
  },
  textSignUpLink: {
    color: Colors.buttonLog,
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: 'bold'
  },
  formLogin:{
    fontFamily: Fonts.type.SPF,
    fontSize: Fonts.size.medium,
    borderWidth: 1,
    borderColor: 'lightgrey',
    marginLeft: 20,
    marginRight: 20,
    height: 48,
    paddingLeft: '5%',
    marginTop: '3%'
  },
  bottomView:{
    width: '100%', 
    height: 50, 
    borderTopColor: '#dddddd',
    borderTopWidth: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    position: 'absolute',
    bottom:0,alignSelf:'flex-end',
    color: 'black',
    fontFamily: Fonts.type.SPF,
    fontSize: Fonts.size.medium
  },
  buttonFb: {
    backgroundColor: Colors.snow,
    height: 48,
    marginBottom: '2%',
    marginLeft: 20,
    marginRight: 20,
    borderColor: Colors.buttonLog,
    borderWidth: 1,
    padding: 10
  },
  loginFbText: {
    color: Colors.buttonLog,
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: 30,
    fontFamily: Fonts.type.SPF,
    fontWeight: 'bold',
    fontSize: Fonts.size.loginButton
  },
  buttonGoogle: {
    backgroundColor: Colors.snow,
    height: 48,
    marginBottom: '4%',
    marginLeft: 20,
    marginRight: 20,
    borderColor: Colors.fire,
    borderWidth: 1,
    padding: 10
  },
  loginGoogle: {
    color: Colors.fire,
    marginLeft: 'auto',
    marginRight: 'auto',
    lineHeight: 30,
    fontFamily: Fonts.type.SPF,
    fontWeight: 'bold',
    fontSize: Fonts.size.loginButton
  }
})
