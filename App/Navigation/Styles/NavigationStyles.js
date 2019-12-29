import { StyleSheet } from 'react-native'
import Scale from '../../Transforms/Scale'
import { Colors } from '../../Themes/'

export default StyleSheet.create({
  header: {
    backgroundColor: Colors.backgroundColor
  },
  logoBlue: {
    width: Scale(104),
    height: 26,
    marginLeft: 'auto',
    marginRight: 'auto',
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
  }
})
