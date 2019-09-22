import React from 'react'
import { View, TouchableOpacity, Image, Text } from 'react-native'
import { Calculator } from 'react-native-calculator'

export default class Calculatora extends React.Component {
  render () {
    return (
      <View style={{ flex: 1 }}>
       <View style={{ height:'7%', width:'100%', backgroundColor:'#2e8b57', alignItems:'center', elevation:10, flexDirection:'row'}}>
          <TouchableOpacity style={{marginRight:'5%', marginLeft:'3%'}}
          onPress={() => this.props.navigation.navigate('Home')}>
          <Image style={{width:25, height:20}} source ={require('../Image/left-arrow.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize:19, color:'white', fontWeight:'bold'}}>Calculator</Text>
        </View>
        <Calculator style={{ flex: 1 }} 
          fontSize={20}
          numericButtonColor='black'
          numericButtonBackgroundColor="white"
          calcButtonColor="white"
          actionButtonColor='#778899'
          keyboardHeight={300}
          displayHeight={271}
          
        />
      </View>
    )
  }
}
