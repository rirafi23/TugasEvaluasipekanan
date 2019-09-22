import React from 'react'
import {
  View,
  TextInput,
  Image,
  Text,
  ScrollView,
  Button,
  TouchableOpacity,
  Dimensions,
  Modal,
  ActivityIndicator,
  AsyncStorage,
  StyleSheet
} from 'react-native'


const { width: WIDTH } = Dimensions.get('window')

class Register extends React.Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirPassword:'',
    token: '',
    modaVisibel: false,
    modalHome:false
  }

  Register = (username, email, password) => {
    this.setState({ modaVisibel: true })
    fetch('https://penjualanapp-api.herokuapp.com/api/v1/auth/register', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response.token) {
          AsyncStorage.setItem('token', response.token)
          this.props.navigation.navigate('Home')

        } else if (response.username) {
          alert(response.username)
        } else if (response.email) {
          alert(response.email)
        } else if (this.state.password != this.state.confirPassword) {
          alert('password sidak sama')
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
    let { username, email, password } = this.state

    return (
      <View style={{ flex: 1, backgroundColor:'white'}}>
        <Modal
          animationType='slide'
          transparent
          visible={this.state.modaVisibel}
        >
          <View style={Styles.ViewModal}>
            
            <ActivityIndicator size='large' color='red' />
            
          </View>
        </Modal>

       

        <ScrollView>
          <Image
            style={Styles.ImgLogo}
            source={require('../Image/logoregistrasi.jpg')}
          />
          <View style={Styles.ViewDisplay}>
            <TextInput
              style={Styles.TextInputDisplay}
              value={this.state.username}
              placeholder='username'
              onChangeText={teks => this.setState({ username: teks })}
            />
            <TextInput
              style={Styles.TextInputDisplay}
              value={this.state.email}
              placeholder='email'
              onChangeText={teks => this.setState({ email: teks })}
            />
            <TextInput
              style={Styles.TextInputDisplay}
              value={this.state.password}
              placeholder='password'
              onChangeText={teks => this.setState({ password: teks })}
            />
            <TextInput
              style={Styles.TextInputDisplay}
              value={this.state.confirPassword}
              placeholder='Confirmasi Password'
              onChangeText={teks => this.setState({ confirPassword: teks })}
            />
            <Text style={Styles.TextPesan}>
              Dengan mengklik Register anda menyetujui semua kebijakan dan
              privasi kami.
            </Text>
            <TouchableOpacity
              style={Styles.TouchDisplay}
              onPress={() => this.Register(username, email, password)}
            >
              <Text style={Styles.TextRegister}>REGISTER</Text>
            </TouchableOpacity>
            <View
              style={Styles.ViewDisplay2}
            >
              <Text style={Styles.TextLogin}>Sudah punya akun ? </Text>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Login')}
              >
                <Text
                  style={Styles.TextLogin2}
                >
                  {' '}
                  Login{' '}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}
export default Register

const Styles = StyleSheet.create({
  ViewModal: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImgLogo: {
    width: 250,
    height: 100,
    marginTop: '20%'
  },
  ViewDisplay: {
    flex: 2,
    alignItems: 'center',
    marginTop: '10%'
  },
  TextInputDisplay: {
    width: '90%',
    fontSize: 16,
    height: 40,
    borderBottomWidth: 1,
    marginBottom: 8
  },
  TextPesan: {
    width: WIDTH - 55,
    fontSize: 11,
    fontStyle: 'italic',
    color: '#778899'
  },
  TouchDisplay: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 35,
    width: '90%',
    backgroundColor: '#228b22',
    marginTop: 20,
    borderRadius: 20
  },
  TextRegister: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16
  },
  ViewDisplay2:{
      flexDirection: 'row', marginTop: 5, width: WIDTH - 45 
  },
  TextLogin:{
      fontSize: 14
  },
  TextLogin2:{
      fontSize: 14,
                    color: 'blue',
                    borderBottomColor: 'green',
                    borderBottomWidth: 1,
                    fontStyle: 'italic'
  }
})
