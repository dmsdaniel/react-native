import React from 'react';
import { View, Text, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes/';
export default function app() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor="#131313" barStyle="light-content" />
      <Routes/>
    </NavigationContainer>  
  )
}