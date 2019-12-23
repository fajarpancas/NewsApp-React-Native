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
  }
})
