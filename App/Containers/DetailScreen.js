import React, { Component } from 'react'
import { ScrollView, Text, KeyboardAvoidingView, FlatList, View, Image } from 'react-native'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'

// Styles
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './Styles/DetailScreenStyle'

class DetailScreen extends Component {
  constructor(props){
    super(props)
    this.state = {
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
    const { data } = this.state
    return (
      <ScrollView> 
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

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen)
