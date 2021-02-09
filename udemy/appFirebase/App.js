import React, { useState, useEffect } from 'react';
import { Text, TextInput, View, StyleSheet, FlatList, SafeAreaView, Button, ActivityIndicator } from 'react-native';
import firebase from './src/firebaseConnections';
import ListaUsers from './src/ListaUsers';


export default function App() {
  const [nome, setNome] = useState('');
  const [cargo, setCargo] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const renderItem = ({ item }) => (
    <View >
      <Text >{item.nome}</Text>
    </View>
  );


  useEffect(() => {
    async function dados() {
      await firebase.database().ref('usuarios').on('value', (snapshot) => {
        setUsers([]);
        snapshot.forEach((childItem) => {

          let data = {
            key: childItem.key,
            nome: childItem.val().nome,
            cargo: childItem.val().cargo
          };
          setUsers(oldArray => [...oldArray, data]);
        })
        setLoading(false);

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
        {loading ?
          (
            <ActivityIndicator color="#AACC" size={60} />
          )
          : (
            <FlatList
              data={users}
              renderItem={({ item }) => (<ListaUsers data={item} />)}
              keyExtractor={item => item.key}
            />)
        }

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
