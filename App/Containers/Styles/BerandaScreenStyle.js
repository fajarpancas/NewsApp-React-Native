import { StyleSheet } from 'react-native'
import { ApplicationStyles, Fonts } from '../../Themes/'
import Scale from '../../Transforms/Scale'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  logoBlue: {
    width: Scale(104),
    height: 26,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logoDrawer: {
    width: Scale(104),
    height: 26,
    marginLeft: 15,
    marginTop: 10
  },
  menus: {
    width: 24,
    height: 24,
    marginLeft: 15
  },
  search: {
    marginRight: 15,
    width: 24,
    height: 24
  },
  containerHead: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderColor: 'lightgrey',
    paddingBottom: 0,
    height: 100
  },
  boxTitle: {
    width: '90%',
  },
  container: {
    flex: 1,
    marginTop: 5  ,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  boxIcon: {
    marginLeft: 15
  },
  boxName: {
    marginTop: 5,
    marginLeft: 5,
    borderBottomWidth: 1,
    width: '100%',
    paddingBottom: 20,
    borderColor: 'lightgrey'
  },
  boxNameLogout: {
    marginTop: 5,
    marginLeft: 5,
    width: '100%',
    paddingBottom: 20,
  },
  textMenu: {
    fontSize: Fonts.size.loginButton,
    fontFamily: Fonts.type.SPF
  },
  wrapper: {
    flex: 1
  },
  boxClose: {
    marginTop: 10,
    marginRight: 15,
    width: '10%'
  }
})
