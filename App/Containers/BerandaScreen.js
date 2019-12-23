import React from 'react';
import { Text, View, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import TodayScreen from './TodayScreen'
import RecommendedScreen from './RecommendedScreen';
import TrendingScreen from './TrendingScreen';
import ShopScreen from './ShopScreen';
import TodayData from '../Redux/TodayRedux'
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Images } from '../Themes'
import styles from './Styles/BerandaScreenStyle'


const TabNavigator = createMaterialTopTabNavigator({
  Today: TodayScreen,
  // Settings: SettingsScreen,
  Trending: TrendingScreen,
  Shoping: ShopScreen,
  Recommended: RecommendedScreen
},
{
initialRouteName: 'Today',
tabBarOptions: {
  upperCaseLabel: false,
  activeTintColor : '#cd077d',
  scrollEnabled: true,
  labelStyle: {
    fontSize: 14,
    color: 'grey',
    fontFamily: 'Montserrat-Bold',
    fontWeight: 'bold'
  },
  tabStyle: {
    width: 115,
  },
  indicatorStyle: {
    borderBottomColor: '#21409A',
    borderBottomWidth: 2
  },
  style: {
    backgroundColor: '#F9F9F8'
  }
}
});

const HeaderContainer = createStackNavigator({
    defaulthome: TabNavigator
  },
  {
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerRight: () => <Icon.Button
                            name="search"
                            backgroundColor="white"
                            color="grey"
                            padding={0}
                            marginRight={10}
                            size={22}>
                        </Icon.Button>,
      headerLeft: () => <Icon.Button
                            name="rocket"
                            backgroundColor="white"
                            color="grey"
                            padding={0}
                            marginLeft={10}
                            size={22}>
                        </Icon.Button>,
      headerTitle: () => <Image source={Images.logo_blue} style={styles.logoBlue} resizeMode='stretch' />,
      headerStyle: {
        backgroundColor: 'white',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
        textAlign: 'center'
      },
    },
})

export default createAppContainer(HeaderContainer, TabNavigator);