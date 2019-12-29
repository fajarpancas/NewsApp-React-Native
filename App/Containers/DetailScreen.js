import React, { Component } from 'react';
import { Text, View, Image, ScrollView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import Share from 'react-native-share';
import { Images } from '../Themes'
import styles from './Styles/DetailScreenStyle'
import Moment from 'moment'
import TodayData from '../Redux/TodayRedux'
import { ShareDialog } from 'react-native-fbsdk'
import { connect } from 'react-redux'

class DetailScreen extends Component {
  constructor(props){
    super(props)
    this.childDiv = React.createRef()
    this.state = {
      seeAll: false,
      fetching: false
    }
  }
  
  shared = (data, sosmed) => {
    if(sosmed == 'fb'){
      const shareOptions = {
        title: data.title,
        message: data.content,
        url: data.url,
        social: Share.Social.FACEBOOK,
        filename: 'test' , // only for base64 file in Android 
      };
      Share.shareSingle(shareOptions);
    }
    else if(sosmed == 'tw'){
      const shareOptions = {
        title: data.title,
        message: data.content,
        url: data.url,
        social: Share.Social.TWITTER,
      };
      Share.shareSingle(shareOptions);
    }
    else if(sosmed == 'wa'){
      const shareOptions = {
        title: data.title,
        message: data.content,
        url: data.url,
        social: Share.Social.WHATSAPP,
        whatsAppNumber: "9199999999",  // country code + phone number(currently only works on Android)
        filename: 'test' , // only for base64 file in Android 
      };
      Share.shareSingle(shareOptions);
    }
    else if(sosmed == 'em'){
      const shareOptions = {
        title: data.title,
        message: data.content,
        url: data.url,
        social: Share.Social.EMAIL,
        whatsAppNumber: "9199999999",  // country code + phone number(currently only works on Android)
        filename: 'test' , // only for base64 file in Android 
      };
      Share.shareSingle(shareOptions);
    }
  }
    
  shareLinkWithShareDialog(description) {
    const shareLinkContent = {
      contentType: 'link',
      contentUrl: "https://twitter.com",
      contentDescription: description,
    };
    var tmp = this;
    ShareDialog.canShow(shareLinkContent).then(
      function(canShow) {
        if (canShow) {
          return ShareDialog.show(shareLinkContent);
        }
      }
    ).then(
      function(result) {
        if (result.isCancelled) {
          console.log('Share cancelled');
        } else {
          console.log('Share success with postId: '
            + result.postId);
        }
      },
      function(error) {
        console.log('Share fail with error: ' + error);
      }
    );
  }

  componentDidMount() {
    this.props.getTech()
  }

  seeAll = () => {
    this.setState({
      seeAll: !this.state.seeAll
    })
  }

  detail = (item) => {
    this.props.navigation.navigate('DetailScreen', {
      dataDetail: item
    })
  }

  renderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => this.detail(item)}>
        <View style={styles.container}>
            <View style={styles.boxTitleTopNews}>
              <Text style={styles.title}>{item.title}</Text>
            </View>
            <View style={styles.boxImageTopNews}>
              <Image source={{uri: item.urlToImage}} style={styles.boxImageTopNews} />
              {/* <Text style={styles.image}>{item.image}</Text> */}
            </View>
          </View>
          <View style={styles.container2}>
            <View style={styles.uploaded}>
              <Text style={styles.timeText}>{Moment(item.publishedAt).format('DD MMMM YYYY')}</Text>
            </View>
            <View style={styles.view}>
              <Image source={Images.eye} style={styles.shareIcon} />
              <Text style={styles.total}>125k</Text>
            </View>
            <View style={styles.shared}>
              <Image source={Images.share} style={styles.shareIcon} />
              <Text style={styles.total}>125k</Text>
            </View>      
          </View>
      </TouchableOpacity>
    )
  }

  render () {
    const { data, seeAll } = this.state
    const { getTech, techList } = this.props

    return (
      <ScrollView> 
        <Text style={styles.titleDetail}>{this.props.navigation.state.params.dataDetail.title}</Text>
        <View style={styles.container2}>
            <View style={styles.uploaded}>
              <Text style={styles.timeText}>{Moment(this.props.navigation.state.params.dataDetail.publishedAt).format('MMMM DD, YYYY')}</Text>
            </View>
            <View style={styles.view}>
              <Image source={Images.eye} style={styles.shareIcon} />
              <Text style={styles.total}>125k</Text>
            </View>
            <View style={styles.shared}>
              <Image source={Images.share} style={styles.shareIcon} />
              <Text style={styles.total}>125k</Text>
            </View>
        </View>

        <View style={{flex: 1, flexDirection: 'row'}}>
          <Text style={styles.textShare}>Share to : </Text>
          <TouchableOpacity onPress={() => this.shared(this.props.navigation.state.params.dataDetail, 'fb')}>
            <Image source={Images.facebook} style={styles.imageSosial} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.shared(this.props.navigation.state.params.dataDetail, 'tw')}>
            <Image source={Images.twitter} style={styles.imageSosial} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.shared(this.props.navigation.state.params.dataDetail, 'wa')}>
            <Image source={Images.whatsapp} style={styles.imageSosial} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.shared(this.props.navigation.state.params.dataDetail, 'em')}>
            <Image source={Images.email} style={styles.imageSosial} />
          </TouchableOpacity>
        </View>

        {/* content */}
        <Text style={styles.contentDetail}>{this.props.navigation.state.params.dataDetail.content}</Text>
        <Image source={{uri: this.props.navigation.state.params.dataDetail.urlToImage}} style={styles.detailImage} />
      
        <View style={styles.wrapper}>
          <View style={styles.containerHead}>
              <View style={styles.boxTitle}>
                <Text style={styles.topNewsTitle}>Recomemended News</Text>
              </View>
              <View style={styles.boxTitle2}>
                <TouchableOpacity onPress={() => this.seeAll()}>
                  <Text style={styles.seeAllText}>{seeAll ? 'See Less' : 'See all'}</Text>
                </TouchableOpacity>
              </View>
          </View>
          
          <FlatList
              data={techList && techList.length && !seeAll ? techList.slice(0, 3) : techList}
              renderItem={this.renderItem}
              ListEmptyComponent={() => {
                return (
                  <View><Text>Empty Data</Text></View>
                )
              }}
              // keyExtractor={item => item.id}
              keyExtractor={item => item.author}

            />
        </View>
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    getTechno: state.news.getTech,
    techList: state.news.TechList.articles
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getTech: () => dispatch(TodayData.getTechnoRequest()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailScreen)
