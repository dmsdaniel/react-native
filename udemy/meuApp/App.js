import React, { useState, useRef } from 'react';
import { Text, TextInput, View, StyleSheet, TouchableOpacity, Keyboard } from 'react-native';
import api from './src/services/api';



export default function app() {
  const [cep, setCep] = useState('');
  const inputRef = useRef(null);
  const [cepUser, setCepUser] = useState(null);

  async function buscar() {
    try {
      const response = await api.get(`/${cep}/json`);
      console.log(response.data);
      setCepUser(response.data);
      Keyboard.dismiss();

    } catch (error) {
      console.log(error);
    }


  };


  function limpar() {
    if (cep.length > 0) {
      setCepUser(null);
      setCep('');
      inputRef.current.focus();
    }

  }

  return (
    <View style={styles.container}>
      <View style={styles.cepArea}>
        <TextInput style={styles.textoCep}
          placeholder="Ex: 13036225"
          value={cep} keyboardType='numeric'
          onChangeText={(texto) => setCep(texto)}
          ref={inputRef}
        />


      </View>
      <View style={styles.areaBtn}>
        <TouchableOpacity style={[styles.botao, { backgroundColor: '#1d75cd' }]} onPress={buscar} >
          <Text style={styles.botaoText}>Buscar</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.botao, { backgroundColor: '#cd3e1d' }]} onPress={limpar}>
          <Text style={styles.botaoText}>Limpar</Text>
        </TouchableOpacity>
      </View>
      { cepUser &&
        <View style={styles.areaCepUser}>
          <Text style={styles.cepUser}>Cep: {cepUser.cep}</Text>
          <Text style={styles.cepUser}>Logradouro: {cepUser.logradouro}</Text>
          <Text style={styles.cepUser}>Localidade: {cepUser.localidade}</Text>
          <Text style={styles.cepUser}>Bairro: {cepUser.bairro}</Text>
          <Text style={styles.cepUser}>Estado: {cepUser.uf}</Text>
        </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cepArea: {
    alignContent: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    margin: 10,

  },
  textoCep: {
    borderStyle: 'solid',
    borderColor: 'black',
    borderWidth: 2,
    fontSize:22,
    color: 'black',
    backgroundColor: 'white',
    width: 350
  },
  areaBtn: {
    flexDirection: 'row',
    alignContent: 'center',
    margin: 10,
    width: 350,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  botao: {
    width: 150,
    height: 50,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },

  botaoText: {

    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',

  },

  areaCepUser:{
    flex:1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  cepUser:{
    fontSize:18,
    fontWeight: 'bold',

  }


})