import React from 'react'
import {
  View,
  Dimensions,
  TextInput,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Image,
  StyleSheet,
  Modal
} from 'react-native'

const { width: WIDTH } = Dimensions.get('window')

class Home extends React.Component {
  state = {
    modaVisibel: true
  }

  out = () => {
    AsyncStorage.removeItem('token')
    this.props.navigation.navigate('Login')
  }

  off = () => {
    this.setState({ modaVisibel: false })
  }

  render () {
    return (
      <View style={{ flex: 1 }}>
        <Modal
          animationType='slide'
          transparent
          visible={this.state.modaVisibel}
        >
          <View
            style={Styles.ViewModal}
          >
          <View style={Styles.ViewModal2}>
            <Text style={{fontSize:20}}>welcome</Text>
            <Text></Text>
            <TouchableOpacity onPress={() => this.off()}
            style={Styles.TouchModal}>
              <Text style={{fontSize:20}}>OK</Text>
            </TouchableOpacity>
          </View>
          </View>
        </Modal>
        <View style={Styles.ViewHeader}>
          <Text style={Styles.TextHeader}>My App</Text>
        </View>
        <View style={Styles.ViewDisplay}>
          <TouchableOpacity
            style={Styles.TouchDisplay}
            onPress={() => this.props.navigation.navigate('News')}
          >
            <Image
              style={Styles.ImgIcon}
              source={require('../Image/berita.jpeg')}
            />
            <Text style={Styles.TextTouch}>News</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.TouchDisplay}
            onPress={() => this.props.navigation.navigate('Calculator')}
          >
            <Image
              style={Styles.ImgIcon}
              source={require('../Image/calculator.png')}
            />
            <Text style={Styles.TextTouch}>Calculator</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={Styles.TouchDisplay}
            onPress={() => this.props.navigation.navigate('ToDoList')}
          >
            <Image
              style={Styles.ImgIcon}
              source={require('../Image/to-do-list.png')}
            />
            <Text style={Styles.TextTouch}>To Do List</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={() => this.out()}>
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
    )
  }
}
export default Home

const Styles = StyleSheet.create({
    ViewModal:{
height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
    },
    ViewModal2:{
        width:200, height:200, backgroundColor:'#f0f8ff', justifyContent: 'center', alignItems: 'center',
    },
    TouchModal:{
        marginLeft:130, backgroundColor:'green', width:50, height:30, alignItems:'center', justifyContent:'center', borderRadius:10
    },
  ViewHeader: {
    height: '8%',
    width: '100%',
    backgroundColor: '#2e8b57',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10
  },
  TextHeader: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  ViewDisplay: {
    flexDirection: 'row',
    marginTop: '5%',
    justifyContent: 'center'
  },
  TouchDisplay: {
    width: '25%',
    height: '55%',
    marginRight: '3%',

    alignItems: 'center',
    justifyContent: 'center'
  },
  ImgIcon: {
    width: 50,
    height: 55
  },
  TextTouch: {
    marginTop: 5,
    color: 'black',
    fontWeight: 'bold',
    fontStyle: 'italic'
  }
})
