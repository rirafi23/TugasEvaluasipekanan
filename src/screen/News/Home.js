import React, { Component } from 'react'
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Image,
  StatusBar,
  TouchableOpacity,
  Dimensions
} from 'react-native'

const {width:WIDTH}= Dimensions.get('window')

export default class PeoplePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      isLoading: true,
      dataSource: []
    }
  }

  _fetchItem = async () => {
    this.setState({ isLoading: true })
    try {
      let response = await fetch(
        'https://newsapi.org/v2/everything?q=bitcoin&from=2019-08-22&sortBy=publishedAt&apiKey=dfe04a71e2674cc09a9bcc7f197f6eee'
      )
      let responseJson = await response.json()
      await this.setState({
        isLoading: false,
        dataSource: responseJson.articles
      })
    } catch (error) {
      console.error(error)
    }
  }

  _separatorComponent = () => {
    return <View style={{ backgroundColor: 'grey', height: 0.5 }} />
  }

  _itemComponent = ({ item }) => {
    return (
      <View style={{ flex: 1 }}>
      <View style={{justifyContent:'center'}}>
        <TouchableOpacity style={{borderWidth:1, marginBottom:'3%'}}
        onPress={() => this.props.navigation.navigate('Home')}>
        <View
          style={{flex:2,
            flexDirection: 'row',
            marginLeft: '3%',
            marginRight: '3%',
            marginTop: '3%',
            alignItems: 'center',
            elevation:10,
            width: WIDTH - 50
          }}
        >
          <Image
            style={{ width: 100, height: 60 }}
            source={{ uri: item.urlToImage }}
          />

          <View style={{ marginLeft: '3%', marginBottom: '3%', paddingRight:'3%' }}>
            <Text style={{ fontSize: 16, fontWeight:'bold' }}>{item.title}</Text>
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ fontSize: 10 }}>{item.publishedAt}</Text>
              <Text style={{ fontSize: 10 }}>{item.source.name}</Text>
            </View>
            <Text style={{ fontSize: 11, paddingRight: '3%', fontStyle:'italic' }}>
              {item.description}
            </Text>
          </View>
        </View>
        </TouchableOpacity>
        </View>
      </View>
    )
  }

  componentDidMount () {
    this._fetchItem()
  }

  render () {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20, backgroundColor:'transparent' }}>
          <ActivityIndicator />
          <View>
            
          </View>
        </View>
      )
    }
    return (
      <View style={{ flex: 1 }}>
        
        <View
          style={{
            height: '8%',
            width: '100%',
            backgroundColor: '#2e8b57',
            alignItems: 'center',
            elevation: 10,
            flexDirection: 'row',
            marginBottom:'3%'
          }}
        >
          <Image style={{width:150, height:50, marginRight:'3%'}} source={require('../../Image/logoregistrasi.jpg')}/>
          <Text style={{ fontSize: 19, color: 'white', fontWeight: 'bold' }}>
            
          </Text>
        </View>
        <FlatList
          data={this.state.dataSource}
          renderItem={this._itemComponent}
          keyExtractor={(item, index) => index.toString()}
          onRefresh={this._fetchItem}
          refreshing={this.state.isLoading}
          ItemSeparatorComponent={this._separatorComponent}
        />
        
      </View>
    )
  }
}
