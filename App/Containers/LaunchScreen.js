import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'

// Styles
import styles from './Styles/LaunchScreenStyles'

export default class LaunchScreen extends Component {
  constructor(props){
    super(props)
  }

  toLogin = () => {
    this.props.navigation.navigate('LoginScreen')
  }
  
  render () {
    return (
      <TouchableOpacity onPress={this.toLogin}>
        <Image source={Images.bgnews} style={styles.backgroundImage} resizeMode='stretch' />
        
      </TouchableOpacity>
    )
  }
}
