import React from 'react'
import {createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Login from '../screen/Login'
import Register from '../screen/Register'
import Home from '../screen/Home'
import News from '../screen/News/Home'
import Calculator from '../screen/Calculator'
import ToDoList from '../screen/ToDoList'

const Stack = createStackNavigator({
    Login:{
        screen:Login,
        navigationOptions:{
            header:null
        }
    },
    Register:{
        screen:Register,
        navigationOptions:{
            header:null
        }
    },
    Home:{
        screen:Home,
        navigationOptions:{
            header:null
        }
    },
    News:{
        screen:News,
        navigationOptions:{
            header:null
        }
    },
    Calculator:{
        screen:Calculator,
        navigationOptions:{
            header:null
        }
    },
    ToDoList:{
        screen:ToDoList,
        navigationOptions:{
            header:null
        }
    },
})
export default createAppContainer(Stack)
