import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors } from '../../Themes/'
import Scale from '../../Transforms/Scale'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  topNewsTitle:{
    color: '#3F3F40',
    borderLeftWidth: 5,
    borderLeftColor: Colors.buttonLog,
    paddingLeft: 12,
    margin: 15,
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.h7
  },
  seeAllText: {
    color: Colors.buttonLog,
    fontSize: Fonts.size.loginButton,
    alignSelf: 'flex-end',
    marginRight: 15,
    marginTop: 15,
    fontFamily: Fonts.type.montserrat
  },
  wrapper: {
    flex: 1
  },
  container: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  containerHead:{
    flex: 3,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  container2: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 5,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    paddingBottom: 10,
    margin: 15
  },
  boxTitle: {
    width: '75%',
    height: '100%'
  },
  boxTitle2: {
    width: '25%',
    height: '100%'
  },
  boxTitleTopNews:{
    width: Scale(230),
    height: 72,
    marginLeft: 15,
    marginRight: 5
  },
  boxImageTopNews:{
    width: Scale(99),
    height: 72,
    marginRight: 15,
    marginLeft: 5,
    resizeMode : 'stretch'
  },  
  title: {
    fontFamily: Fonts.type.montserratSemi,
    fontSize: Fonts.size.regular,
    lineHeight: 24
  },
  uploaded:{
    width: Scale(225),
    height: '100%',
    marginRight: 5,
    marginTop: 5
  },
  view:{
    width: Scale(65),
    height: '100%',
  },
  shared:{
    width: Scale(55),
    height: '100%'
  },
  timeText:{
    color: Colors.buttonLog,
    fontSize: Fonts.size.small,
    color: '#999999'
  },
  TextDetail: {
    marginLeft: 'auto',
    marginRight: 'auto',
    fontSize: Fonts.size.input,
    fontWeight: 'bold',
  },
  titleDetail:{
    fontSize: Fonts.size.h8,
    fontFamily: Fonts.type.montserrat,
    lineHeight: 32,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 15,
    color: 'black'
  },
  detailImage: {
    width: Scale(343),
    height: 205,
    margin: 15
  },
  contentDetail: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: Fonts.size.h9,
    fontFamily: Fonts.type.SPFReg,
    lineHeight: 24
    // letterSpacing : 0.2
  },
  contentDetailAuthor: {
    marginLeft: 15,
    marginRight: 15,
    fontSize: Fonts.size.h9,
    fontFamily: Fonts.type.SPFBold,
    // letterSpacing : 0.2
    lineHeight: 24
  },
  textShare: {
    fontFamily: Fonts.type.SPFReg,
    width: 'auto', 
    marginLeft: 15, 
    marginRight: 15, 
    marginBottom: 35, 
    marginTop: 10
  },
  imageSosial: {
    width: 36, 
    height: 36, 
    marginRight: 10
  },
  total: {
    marginTop: 5,
    marginLeft: 5,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.SPFReg,
  },
  shareIcon: {
    marginTop: 5,
    width: Scale(17),
    height: 17,
  },
  view:{
    width: Scale(55),
    height: '100%',
    flex: 1, 
    flexDirection: 'row'
  },
  shared:{
    width: Scale(55),
    height: '100%',
    marginLeft: 20,
    flex: 1, 
    flexDirection: 'row'
  },
  timeText:{
    color: Colors.buttonLog,
    fontSize: Fonts.size.small,
    fontFamily: Fonts.type.SPFReg,
    color: '#999999'
  },
  arrowLeft: {
    width: 24,
    height: 24,
    marginLeft: 15
  }
})
