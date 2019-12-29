import React, { Component } from 'react'
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native'
import { Images } from '../Themes'
import StartupActions from '../Redux/StartupRedux'
import { connect } from 'react-redux'

// Styles
import styles from './Styles/LaunchScreenStyles'

class LaunchScreen extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount = () => {
    setTimeout(() => {
      this.props.startup()
    }, 3000);
  }

  toLogin = () => {
    // this.props.navigation.navigate('LoginScreen')
  }
  
  render () {
    return (
      <TouchableOpacity onPress={this.toLogin}>
        <Image source={Images.bgnews} style={styles.backgroundImage} resizeMode='stretch' />
        
      </TouchableOpacity>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    // session: state.session
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    startup: () => dispatch(StartupActions.startup())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)
