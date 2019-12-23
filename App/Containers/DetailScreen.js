import React, { Component } from 'react';
import { Text, View, Image, ScrollView, FlatList, ActivityIndicator } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Images } from '../Themes'
import styles from './Styles/DetailScreenStyle'

class DetailScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
      detail: [],
      data: [
        {
          id: 1,
          title: 'Trumps says new U.S law on Hong Kong doesn’t help China trade talks',
          image: 'https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png',
          upload: 2,
          view: 110,
          share: 131
        },
        {
          id: 2,
          title: 'Elon Musk’s jury to be queried on opinions of billionaires',
          image: 'https://facebook.github.io/react-native/img/tiny_logo.png',
          upload: 2,
          view: 120,
          share: 111
        },
        {
          id: 3,
          title: 'China’s Xiaomi launches online lending service in India',
          image: 'https://facebook.github.io/react-native/img/tiny_logo.png',
          upload: 2,
          view: 125,
          share: 112
        },
      ]
    }
  }
  
  componentDidMount() {
    this.setState({
      detail : this.props.navigation.state.params.dataDetail
    })
  }

  renderItem = ({item}) => {
    return (
      <View>
        <View style={styles.container}>
              <View style={styles.boxTitleTopNews}>
                <Text style={styles.title}>{item.title}</Text>
              </View>
              <View style={styles.boxImageTopNews}>
                <Image source={{uri: item.image}} style={styles.boxImageTopNews} />
                {/* <Text style={styles.image}>{item.image}</Text> */}
              </View>
          </View>
          <View style={styles.container2}>
              <View style={styles.uploaded}>
                <Text style={styles.timeText}>{item.upload} hours ago</Text>
              </View>
              <View style={styles.view}>
              <Icon.Button
                  name="eye"
                  backgroundColor="white"
                  color="grey"
                  size={9}
                  padding={0}
                  margin={5}
                  onPress={this.loginWithFacebook}>
                    <Text>{item.view}</Text>
              </Icon.Button>
              </View>
              <View style={styles.shared}>
              <Icon.Button
                  name="share"
                  backgroundColor="white"
                  color="grey"
                  padding={0}
                  margin={5}
                  size={9}
                  onPress={this.loginWithFacebook}>
                    <Text>{item.share}</Text>
              </Icon.Button>      
              </View>
          </View>
      </View>
    )
  }

  render () {
    const { data, detail } = this.state
    // alert(JSON.stringify(detail))

    return (
      <ScrollView> 
        <Text style={styles.titleDetail}>{this.props.navigation.state.params.dataDetail.title}</Text>

        <View style={styles.wrapper}>
          <View style={styles.containerHead}>
              <View style={styles.boxTitle}>
                <Text style={styles.topNewsTitle}>Recomemended News</Text>
              </View>
              <View style={styles.boxTitle2}>
                <Text style={styles.seeAllText}>See all</Text>
              </View>
          </View>

          <FlatList
            data={data}
            renderItem={this.renderItem}
            // keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    )
  }
}

const HeaderDetailContainer = createStackNavigator(
  {
    defaulthome: DetailScreen
  },
  {
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerRight: () => <Icon.Button
                            name="search"
                            backgroundColor="white"
                            color="white"
                            padding={0}
                            marginRight={10}
                            size={22}>
                        </Icon.Button>,
      headerLeft: () => <Icon.Button
                            name="arrow-left"
                            backgroundColor="white"
                            color="grey"
                            padding={0}
                            marginLeft={10}
                            size={22}>
                        </Icon.Button>,
      headerTitle: () => <Text style={styles.TextDetail}>Top News</Text>,
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

export default createAppContainer(HeaderDetailContainer);