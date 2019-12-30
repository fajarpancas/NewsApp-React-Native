import React from 'react';
import { Text, View, Image, Dimensions, SafeAreaView, ScrollView, List, ListView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import TodayScreen from './TodayScreen'
import RecommendedScreen from './RecommendedScreen';
import TrendingScreen from './TrendingScreen';
import ShopScreen from './ShopScreen';
import { Images } from '../Themes'
import styles from './Styles/BerandaScreenStyle'
import { TouchableOpacity } from 'react-native-gesture-handler';
import SideMenuScreen from './SideMenuScreen'
import Scale from '../Transforms/Scale'


const TabNavigator = createMaterialTopTabNavigator({
  Today: {
    screen: TodayScreen,
  },
  // Settings: SettingsScreen,
  Trending: TrendingScreen,
  Shoping: ShopScreen,
  Recommended: RecommendedScreen,
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
    width: Scale(120),
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

const MyDrawerNavigator = createDrawerNavigator({
    defaulthome: TabNavigator
  },
  {
    contentComponent: SideMenuScreen,
    drawerWidth: Dimensions.get('window').width * 7/8
  }
);

export default createAppContainer(MyDrawerNavigator, TabNavigator);