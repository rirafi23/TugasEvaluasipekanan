import React from 'react';
import {View, Text, Image, ActivityIndicator, } from 'react-native';
import Route from '../Route/index' 
class SplasScreen extends React.Component{
  state={
    role:true
  }
  
  render(){
    setTimeout(()=>{
      this.setState({
        role:false
      })
  }, 3000)

  if(this.state.role){
    return(
      <View style={{flex:1, backgroundColor:'#c0c0c0'}}>
          <View style={{flex:2, justifyContent:'center', alignItems:'center'}}>
          </View>
          <View style={{marginBottom:'20%', alignItems:'center'}}>
          <ActivityIndicator size='large'/>
          <Text style={{marginTop:'3%'}}>loading...</Text>
          </View>
      </View>
    );
  }
  return(
    <Route/>
  )
}
}
export default SplasScreen;
