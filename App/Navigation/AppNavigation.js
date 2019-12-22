import { createAppContainer } from 'react-navigation'
import DetailScreen from '../Containers/DetailScreen'
import RecommendedScreen from '../Containers/RecommendedScreen'
import ShopScreen from '../Containers/ShopScreen'
import TrendingScreen from '../Containers/TrendingScreen'
import TodayScreen from '../Containers/TodayScreen'
import BerandaScreen from '../Containers/BerandaScreen'
import LoginScreen from '../Containers/LoginScreen'
import { createStackNavigator } from 'react-navigation-stack';
import LaunchScreen from '../Containers/LaunchScreen'

import styles from './Styles/NavigationStyles'

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  DetailScreen: { screen: DetailScreen },
  RecommendedScreen: { screen: RecommendedScreen },
  ShopScreen: { screen: ShopScreen },
  TrendingScreen: { screen: TrendingScreen },
  TodayScreen: { screen: TodayScreen },
  BerandaScreen: { screen: BerandaScreen },
  LoginScreen: { screen: LoginScreen },
  LaunchScreen: { screen: LaunchScreen }
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'LaunchScreen',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
