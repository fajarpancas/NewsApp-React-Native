import React from 'react';
import { Text, View } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import TodayScreen from './TodayScreen'
import RecommendedScreen from './RecommendedScreen';
import TrendingScreen from './TrendingScreen';
import ShopScreen from './ShopScreen';
import TodayData from '../Redux/TodayRedux'


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


TabNavigator.navigationOptions = {

  header : ( /* Your custom header */
    <View
      style={{
        height: 80,
        marginTop: 20 /* only for IOS to give StatusBar Space */
      }}
    >
      <Text>This is CustomHeader</Text>
    </View>
  )
};

export default createAppContainer(TabNavigator);