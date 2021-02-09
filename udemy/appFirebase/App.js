import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, FlatList, SafeAreaView, Button, ActivityIndicator } from 'react-native';
import firebase from './src/firebaseConnections';


export default function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  async function cadastrar() {
    await firebase.auth().createUserWithEmailAndPassword(email, senha)
    .then( (value) => {
      alert('Usuario cadastrado:' + value.user.email)
      setEmail('');
      setSenha('');
    }).catch((error) => {
      if( error.code === 'auth/weak-password') {
        alert('Senha precisa ser 6 digitos!!')
      }
      if( error.code === 'auth/invalid-email') {
        alert('Email invalido!!')
      }
    });
     

  }

  return (
    <View style={styles.container}>
      <View style={styles.areaInput}>
        <Text>Email</Text>
        <TextInput style={styles.textInput}
          onChangeText={(texto) => setEmail(texto)}
          value={email}
          placeholder='Digite seu email:'>
        </TextInput>
        <Text>Senha</Text>
        <TextInput style={styles.textInput}
          value={senha}
          onChangeText={(texto) => setSenha(texto)}
          placeholder='Digite sua senha:'>
        </TextInput>
        <Button title='Cadastrar' onPress={cadastrar}></Button>
      </View>
    </View>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    marginTop: 25,

  },
  areaInput: {
    margin: 10,
  },
  textInput: {
    marginTop: 10,
    borderWidth: 2,
  }
})
