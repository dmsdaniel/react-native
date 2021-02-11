import 'react-native-gesture-handler';
import React from 'react';
import {createStackNavigator } from '@react-navigation/stack';
import Home from '../pages/Home';

const AppStack = createStackNavigator();

function AppRoutes(){
    return(
        <AppStack.Navigator>
            <AppStack.Screen nome="Home" component={HOme}/>
        </AppStack.Navigator>
    )
}

export default AppRoutes;