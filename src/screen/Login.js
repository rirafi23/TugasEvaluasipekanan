import React from 'react'
import {
  View,
  TextInput,
  Text,
  Button,
  Modal,
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
  Dimensions,
  Image,
  StyleSheet
} from 'react-native'
import Home from './Home'

const { width: WIDTH } = Dimensions.get('window')

class Login extends React.Component {
  state = {
    isLoading: true,
    Login: false,
    modaVisibel: false,
    username: '',
    password: '',
    token: ''
  }

  componentDidMount () {
    AsyncStorage.getItem('token').then(value => {
      if (value != null) {
        this.props.navigation.navigate('Home')
      }
    })
  }

  Login = (username, password) => {
        this.setState({ modaVisibel: true })
    fetch('https://penjualanapp-api.herokuapp.com/api/v1/auth/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response.data.token) {
          AsyncStorage.setItem('token', response.data.token)
          this.props.navigation.navigate('Home')
        } else if (response.username) {
          alert(response.username)
        } else if (response.email) {
          alert(response.email)
        }
      })
      .then(response => {
        this.setState({ modaVisibel: false })
      })
      .catch(error => {
        this.setState({ modaVisibel: false })
        console.log(error)
        alert('error')
      })
  }

  render () {
    let { username, password } = this.state
    
    return (
      <View style={{ flex: 1, backgroundColor: 'white'}}>
       
       <Modal
          animationType='slide'
          transparent
          visible={this.state.modaVisibel}
        >
          <View style={Styles.ViewModal}>
            <ActivityIndicator size='large' color='red' />
          </View>
        </Modal>

        <View style={Styles.viewDisplay}>
          <Image
            style={Styles.LogoDisplay}
            source={require('../Image/logohme.jpg')}
          />
          <TextInput
            style={Styles.TextInputDisplay}
            value={this.state.username}
            placeholder='username'
            onChangeText={teks => this.setState({ username: teks })}
          />
          <TextInput
            style={Styles.TextInputDisplay}
            value={this.state.password}
            placeholder='password'
            onChangeText={teks => this.setState({ password: teks })}
            secureTextEntry
          />
          <View style={{ flexDirection: 'row' }}>
            <Text style={Styles.TextPesanDisplay}>
              Dengan mengklik Login andan menyetujui semua{' '}
            </Text>
            {/* <Text style={{ color: '#00ffff' }}>Kebijakan</Text>
            <Text style={Styles.TextPesanDisplay}>dan</Text>
            <Text>Privasi Kami.</Text> */}
          </View>
          <TouchableOpacity
            style={Styles.TouchLogin}
            onPress={() => this.Login(username, password)}
          >
            <Text style={Styles.TextLogin}>LOGIN</Text>
          </TouchableOpacity>
          <View style={Styles.ViewRegister}>
            <Text style={Styles.TextViewRegister}>Belum punya akun ? </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Register')}
            >
              <Text style={Styles.TextRegister}> Register </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
}
export default Login

const Styles = StyleSheet.create({
   ViewModal: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewDisplay: {
    flex: 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '15%'
  },
  LogoDisplay: {
    width: 180,
    height: 180,
    marginBottom: '10%'
  },
  TextInputDisplay: {
    height: 40,
    width: '80%',
    paddingLeft: 5,
    borderBottomWidth: 1,
    fontSize: 16,
    marginBottom: 10
  },
  TextPesanDisplay: {
    width: WIDTH - 80,
    fontSize: 11,
    fontStyle: 'italic',
    color: '#778899'
  },
  TouchLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: '80%',
    backgroundColor: '#228b22',
    marginTop: 20,
    borderRadius:20
  },
  TextLogin: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  ViewRegister: {
    flexDirection: 'row',
    marginTop: 5,
    width: WIDTH - 75
  },
  TextViewRegister: {
    fontSize: 14
  },
  TextRegister: {
    fontSize: 14,
    color: 'blue',
    borderBottomColor: 'green',
    borderBottomWidth: 1,
    fontStyle: 'italic'
  }
})
