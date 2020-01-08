import React, { Component } from 'react'
import { ActivityIndicator, RefreshControl, View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import PropTypes from 'prop-types'
import Moment from 'moment'
import { connect } from 'react-redux'
// Add Actions - replace 'Your' with whatever your reducer is called :)
// import YourActions from '../Redux/YourRedux'
import TodayData from '../Redux/TodayRedux'
import { Images } from '../Themes'

// Styles
import styles from './Styles/TodayScreenStyle'

class LoadMoreNewsScreen extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    getListRequest: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isRefreshing: false,
      page: 2,
      fecth: false
    }
    this.fetchFunction = this.fetchFunction.bind(this)
    this.onRefresh = this.onRefresh.bind(this)
    this.onLoadMore = this.onLoadMore.bind(this)
  }

  componentDidMount() {
    this.fetchFunction(1, true)
  }

  fetchFunction(page, reset) {
    const data={
      page: page,
      reset: reset
    }
    this.props.getListRequest(data)
  }

  onRefresh() {
    this.setState({page: 2})
    this.fetchFunction(this.page, true)
  }

  onLoadMore() {
    this.setState({page: this.state.page + 1})
    this.fetchFunction(this.state.page, false)
  }

  _onRefresh = () => {
    this.setState({ isRefreshing: true })
    setTimeout(() => {
      this.setState({page: 2})  
      this.componentDidMount()
      this.setState({ isRefreshing: false })
    }, 1000);
  }


  renderItem = ({ item }) => {
    return (
      <TouchableOpacity onPress={() => this.detail(item)}>
        <View style={styles.container}>
          <View style={styles.boxTitleTopNews}>
            {item.title && item.title.length > 55 ?
              <Text style={styles.title}>{item.title.slice(0, 55)}..</Text>
              :
              <Text style={styles.title}>{item.title} </Text>
            }
          </View>
          <View style={styles.boxImageTopNews}>
            <Image source={{ uri: item.urlToImage }} style={styles.boxImageTopNews} />
          </View>
        </View>
        <View style={styles.container2}>
          <View style={styles.uploaded}>
            <Text style={styles.timeText}>{Moment(item.publishedAt).format('DD MMMM YYYY')}</Text>
          </View>
          <View style={styles.view}>
            <Image source={Images.eye} style={styles.shareIcon} />
            <Text style={styles.total}>{item.viewCount}</Text>
          </View>
          <View style={styles.shared}>
            <Image source={Images.share} style={styles.shareIcon} />
            <Text style={styles.total}>{item.shareCount}</Text>
          </View>
        </View>
      </TouchableOpacity>
    )
  }

  _renderRefreshControl() {
    return (
      <RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={this._onRefresh}
      />
    );
  };

  renderLoading = () => {
    if (this.props.getListStatus.fetching) {
      return <ActivityIndicator />
    }
    return null
  }

  render() {
    const { list, getListStatus } = this.props
    const { fetching } = getListStatus


    // if(fetching === true){
    //   return (
    //     <ActivityIndicator size="large" style={{ marginTop: 20 }}></ActivityIndicator>
    //   )
    // }
    if (list && fetching === false) {
      return (
        <FlatList
          data={list}
          renderItem={this.renderItem.bind(this)}
          ListEmptyComponent={() => {
            return (
              <View><Text>Empty Data</Text></View>
            )
          }}
          refreshControl={this._renderRefreshControl()}
          keyExtractor={item => item.author}
          ListFooterComponent={this.renderLoading}
              // onRefresh={this.onRefresh}
          onEndReachedThreshold={1}
          onEndReached={(distance)=>{
            console.log(distance)
            if(distance.distanceFromEnd > 0){
              this.onLoadMore()
            }
            }}
        />
      )
    }
    return (
      <View></View>
    )
  }

}

const mapStateToProps = (state) => {
  // alert(JSON.stringify(state.news.getList))
  return {
    list: state.news.list,
    getListStatus: state.news.getList
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getListRequest: data => dispatch(TodayData.getListRequest(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoadMoreNewsScreen)
