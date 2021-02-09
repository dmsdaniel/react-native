import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, FlatList, SafeAreaView, Button } from 'react-native';
import firebase from './src/firebaseConnections';


export default function App() {
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [users, setUsers] = useState([
    { id: 1, nome: 'user1' },
    { id: 2, nome: 'user2' },
    { id: 3, nome: 'user3' },
    { id: 4, nome: 'user4' },

  ]);
  const renderItem = ({ item }) => (
    <View >
      <Text >{item.nome}</Text>
    </View>
  );


  useEffect(() => {
    async function dados() {
      await firebase.database().ref('usuarios').on('value', (snapshot) => {

      })
    }
    dados();
  }, []);

  async function cadastrar() {
    if (nome != '' && cargo != '') {
      let usuarios = await firebase.database().ref('usuarios');
      let chave = (await usuarios.push()).key;
      usuarios.child(chave).set({
        nome: nome,
        cargo: cargo
      });
      setNome('');
      setCargo('');
      alert('Cadastrado com sucesso!!!');
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.areaInput}>
        <Text>Nome</Text>
        <TextInput style={styles.textInput}
          onChangeText={(texto) => setNome(texto)}
          value={nome}
          placeholder='Digite seu nome:'>
        </TextInput>
        <Text>Cargo</Text>
        <TextInput style={styles.textInput}
          value={cargo}
          onChangeText={(texto) => setCargo(texto)}
          placeholder='Digite seu cargo:'>
        </TextInput>
        <Button title='Salvar' onPress={cadastrar}></Button>
      </View>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={users}
          renderItem={(renderItem)}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>

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
