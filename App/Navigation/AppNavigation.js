import React from 'react'
import { Text, Image, TouchableOpacity } from 'react-native'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import DetailScreen from '../Containers/DetailScreen'
import RecommendedScreen from '../Containers/RecommendedScreen'
import ShopScreen from '../Containers/ShopScreen'
import TrendingScreen from '../Containers/TrendingScreen'
import TodayScreen from '../Containers/TodayScreen'
import BerandaScreen from '../Containers/BerandaScreen'
import LoginScreen from '../Containers/LoginScreen'
import { createStackNavigator } from 'react-navigation-stack';
import LaunchScreen from '../Containers/LaunchScreen'
import Images from '../Themes/Images'
import styles from './Styles/NavigationStyles'

// Manifest of possible screens
export const AuthStack = createStackNavigator(
  {
    LoginScreen: {
      screen: LoginScreen, navigationOptions: {
        header: null
      }
    },
  },
  {
    initialRouteName: 'LoginScreen'
  }
)

const MainStack = createStackNavigator(
  {
    Beranda: {
      screen: BerandaScreen,
      navigationOptions: ({navigation}) => ({
        headerLeft: () => <TouchableOpacity onPress={() => navigation.openDrawer()}><Image source={Images.menu} style={styles.menus} /></TouchableOpacity>,
        headerTitle: () => <Image source={Images.logo_blue} style={styles.logoBlue} resizeMode='stretch' />,
        headerRight: () => <Image source={Images.search} style={styles.search} />,
        headerStyle: {
          backgroundColor: 'white',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          textAlign: 'center'
        },
      })
    },
    DetailScreen: { screen: DetailScreen },
    RecommendedScreen: { screen: RecommendedScreen },
    ShopScreen: { screen: ShopScreen },
    TrendingScreen: { screen: TrendingScreen },
    TodayScreen: { screen: TodayScreen },
  },
  {
    initialRouteName: 'Beranda',
    headerMode: 'screen'
  }
)

const PrimaryNav = createSwitchNavigator({
  Splash: LaunchScreen,
  Main: MainStack,
  Auth: AuthStack,
}, {
  // Default config for all screens
  headerMode: 'none',
  initialRouteName: 'Splash',
  navigationOptions: {
    headerStyle: styles.header
  }
})

export default createAppContainer(PrimaryNav)
