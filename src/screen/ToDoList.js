import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  AsyncStorage
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
const myIcon = <Icon name="plus-circle" size={30} color="#900" />;

export default class extends React.Component {
  state = {
    teks: '',
    hasilnya: []
  }

  saveData() {
  let hasilnya = this.state.hasilnya
  
  let data = {
      hasilnya: hasilnya,
  }
  AsyncStorage.setItem('user', JSON.stringify(data));
  this.setState({
      hasilnya: hasilnya
  });

  alert('Data tersimpan');
}

  add = () => {
    if (this.state.teks !== '') {
      this.state.hasilnya.push(this.state.teks)
      this.setState({ hasilnya: this.state.hasilnya, teks: '' })
      this.saveData.bind(this)
    } 
  }
   delete(value){
        let newDelete= this.state.hasilnya.filter((cek)=>{
            return value!=cek
        })
        this.setState({hasilnya:newDelete})
    }
  render () {
    let list = this.state.hasilnya.map((value, key) => {
      return (
        <View key={key} style={{flexDirection:'row', alignItems:'flex-end', borderWidth:1, elevation:3, marginTop:5, marginLeft:'2%', marginRight:'2%'}}>
          <Text style={{ width: '88%', paddingLeft:10, paddingTop:5, paddingBottom:5 }}>{value}</Text>

          <TouchableOpacity
          onPress={this.delete.bind(this,value)}>
            <Image style={{width:30, height:30, marginBottom:5, marginLeft:5, marginTop:5}} source={require('../Image/delet.png')}/>
          </TouchableOpacity>
        </View>
      )
    })
    return (
      <View style={{ flex: 1 }}>
        <View style={{height:'7%', width:'100%', backgroundColor:'#2e8b57', alignItems:'center', elevation:5, flexDirection:'row'}}>
          <TouchableOpacity style={{marginRight:'5%', marginLeft:'3%'}}
          onPress={() => this.props.navigation.navigate('Home')}>
          <Image style={{width:25, height:20}} source ={require('../Image/left-arrow.png')}/>
          </TouchableOpacity>
          <Text style={{fontSize:19, color:'white', fontWeight:'bold'}}>To Do List</Text>
        </View>

        <View style={{backgroundColor:'white', height:'83%'}}>
          <ScrollView>{list}</ScrollView>
        </View>

        <View style={{height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems:'center',
    paddingHorizontal: 10}}>
          <TextInput
            style={{width:'85%', borderRadius:20, borderWidth:1, paddingLeft:10}}
            placeholder='apa yang sedang anda pikirkan'
            value={this.state.teks}
            onChangeText={t => this.setState({ teks: t })}
          />

          <TouchableOpacity onPress={() => this.add()}>
            <Image style={{width:40, height:40}} source={require('../Image/add.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    )
  }
}

const Styles = StyleSheet.create({
  
})
