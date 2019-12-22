import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts, Colors } from '../../Themes/'
import Scale from '../../Transforms/Scale'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  topNewsTitle:{
    color: '#3F3F40',
    fontWeight: 'bold',
    borderLeftWidth: 5,
    borderLeftColor: Colors.buttonLog,
    paddingLeft: 12,
    margin: 15,
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.h7
  },
  seeAllText: {
    fontWeight: 'bold',
    color: Colors.buttonLog,
    fontSize: Fonts.size.loginButton,
    alignSelf: 'flex-end',
    margin: 15
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
    width: '50%',
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
    backgroundColor: Colors.buttonLog,
    height: 72,
    marginRight: 15,
    marginLeft: 5,
    backgroundColor: Colors.buttonLog,
    resizeMode : 'stretch'
  },  
  title: {
    fontFamily: Fonts.type.montserrat,
    fontSize: Fonts.size.regular
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
    color: Colors.buttonLog
  },
  contentAdvert:{
    backgroundColor: '#f0f0f0',
    height : 50
  },
  videoImage:{
    height: 92
  },
  containerVideo:{
    width: Scale(145),
    height: '100%',
    marginLeft: 15,
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
    paddingBottom: 10,
  }
})
