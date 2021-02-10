import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, SafeAreaView, Button, ActivityIndicator } from 'react-native';
import firebase from './src/firebaseConnections';


export default function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [user, setUser] = useState('');

  async function cadastrar() {
    await firebase.auth().createUserWithEmailAndPassword(email, senha)
      .then((value) => {
        alert('Usuario cadastrado:' + value.user.email)
        setEmail('');
        setSenha('');
      }).catch((error) => {
        if (error.code === 'auth/weak-password') {
          alert('Senha precisa ser 6 digitos!!')
        }
        if (error.code === 'auth/invalid-email') {
          alert('Email invalido!!')
        }
      });

  }

  async function logar() {
    await firebase.auth().signInWithEmailAndPassword(email, senha)
      .then((value) => {
        setUser(value.user.email);
      }).catch((error) => {
        alert(error)
      });
  }

  async function logout() {
    await firebase.auth().signOut();
    setUser('');
    alert('Deslogado com sucesso!!!');
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
      </View>
     
      <View style={styles.areaBotoes}>
        <TouchableOpacity onPress={cadastrar} style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Cadastrar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={logar} style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
      <Text style={{fontSize: 20, fontWeight:'bold', textAlign: 'center'}}>{user}</Text>
      { user.length > 0 ? (
        <Button onPress={logout} title="Logout">
        </Button>
      ) : (
          <Text style={{fontSize: 20, fontWeight:'bold', textAlign: 'center'}}>Nenhum Usuario Logado</Text>
        )

      }



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
  },
  areaBotoes: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 10,

  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center',
    width: 180,
  },
  appButtonText: {
    margin: 10,
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  }
})
