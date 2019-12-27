import React from 'react';
import { Text, View, Image, Dimensions, SafeAreaView, ScrollView, List, ListView } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
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
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ListItem } from 'native-base';

class SideMenu extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <SafeAreaView style={{flex: 1}}>
        <View style={styles.containerHead}>
              <View style={styles.boxTitle}>
                <Image source={Images.logo_blue} style={styles.logoDrawer} resizeMode='stretch' />
              </View>
              <View style={styles.boxClose}>
                <TouchableOpacity onPres={() => this.props.navigation.closeDrawer()}><Image source={Images.cancel} style={styles.search} resizeMode='stretch' /></TouchableOpacity>
              </View>
          </View>
          <ScrollView>
          <View style={styles.container}>
              <View style={styles.boxIcon}>
                <Image source={Images.newsMenu} style={styles.search} resizeMode='stretch' />
              </View>
              <View style={styles.boxName}>
                <TouchableOpacity onPres={() => this.props.navigation.navigate('')}>
                  <Text style={styles.textMenu}>News</Text>
                </TouchableOpacity>
              </View>
          </View>
          <View style={styles.container}>
              <View style={styles.boxIcon}>
                <Image source={Images.videosMenu} style={styles.search} resizeMode='stretch' />
              </View>
              <View style={styles.boxName}>
                <TouchableOpacity onPres={() => this.props.navigation.navigate('')}>
                  <Text style={styles.textMenu}>Videos</Text>
                </TouchableOpacity>
              </View>
          </View>
          <View style={styles.container}>
              <View style={styles.boxIcon}>
                <Image source={Images.shopMenu} style={styles.search} resizeMode='stretch' />
              </View>
              <View style={styles.boxName}>
                <TouchableOpacity onPres={() => this.props.navigation.navigate('')}>
                  <Text style={styles.textMenu}>Shop</Text>
                </TouchableOpacity>
              </View>
          </View>
          <View style={styles.container}>
              <View style={styles.boxIcon}>
                <Image source={Images.rewardMenu} style={styles.search} resizeMode='stretch' />
              </View>
              <View style={styles.boxName}>
                <TouchableOpacity onPres={() => this.props.navigation.navigate('')}>
                  <Text style={styles.textMenu}>Reward</Text>
                </TouchableOpacity>
              </View>
          </View>
          <View style={styles.container}>
              <View style={styles.boxIcon}>
                <Image source={Images.subscripMenu} style={styles.search} resizeMode='stretch' />
              </View>
              <View style={styles.boxName}>
                <TouchableOpacity onPres={() => this.props.navigation.navigate('')}>
                  <Text style={styles.textMenu}>Subscription</Text>
                </TouchableOpacity>
              </View>
          </View>
          <View style={styles.container}>
              <View style={styles.boxIcon}>
                <Image source={Images.accMenu} style={styles.search} resizeMode='stretch' />
              </View>
              <View style={styles.boxName}>
                <TouchableOpacity onPres={() => this.props.navigation.navigate('')}>
                  <Text style={styles.textMenu}>Account</Text>
                </TouchableOpacity>
              </View>
          </View>
          <View style={styles.container}>
              <View style={styles.boxIcon}>
                <Image source={Images.advMenu} style={styles.search} resizeMode='stretch' />
              </View>
              <View style={styles.boxName}>
                <TouchableOpacity onPres={() => this.props.navigation.navigate('')}>
                  <Text style={styles.textMenu}>Advertise</Text>
                </TouchableOpacity>
              </View>
          </View>
          <View style={styles.container}>
              <View style={styles.boxIcon}>
                <Image source={Images.setMenu} style={styles.search} resizeMode='stretch' />
              </View>
              <View style={styles.boxName}>
                <TouchableOpacity onPres={() => this.props.navigation.navigate('')}>
                  <Text style={styles.textMenu}>Setting</Text>
                </TouchableOpacity>
              </View>
          </View>
          <View style={styles.container}>
              <View style={styles.boxIcon}>
                <Image source={Images.logoutMenu} style={styles.search} resizeMode='stretch' />
              </View>
              <View style={styles.boxNameLogout}>
                <TouchableOpacity onPres={() => this.props.navigation.navigate('')}>
                  <Text style={styles.textMenu}>Logout</Text>
                </TouchableOpacity>
              </View>
          </View>
          </ScrollView>
          
      </SafeAreaView>
    )
  }
}


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

const MyDrawerNavigator = createDrawerNavigator({
    defaulthome: TabNavigator
  },
  {
    contentComponent: SideMenu,
    drawerWidth: Dimensions.get('window').width * 7/8
  }
);

const HeaderContainer = createStackNavigator({
    defaulthome: TabNavigator
  },
  {
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerRight: () => <Image source={Images.search} style={styles.search} />,
      headerLeft: () => <TouchableOpacity onPress={() => this.props.navigation.openDrawer()}><Image source={Images.menu} style={styles.menus} /></TouchableOpacity>,
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

export default createAppContainer(MyDrawerNavigator, HeaderContainer, TabNavigator);