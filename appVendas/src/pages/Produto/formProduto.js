import React, { useState } from "react";
import { Text, View } from "react-native";
import { TextInput } from 'react-native-paper';
import { useForm, Controller } from "react-hook-form";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { List, Area, ButtonMenu, Button } from './style';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

export default function App() {
  const { control, handleSubmit, errors } = useForm();
  const [categoria, setCategoria] = useState({ categoria: '', id: '' });
  const [categoriaList, setCategoriaList] = useState([
    { id: 1, categoria: 'categoria 1' },
    { id: 2, categoria: 'categoria 2' },
    { id: 3, categoria: 'categoria 3' },
    { id: 4, categoria: 'categoria 4' },
    { id: 5, categoria: 'categoria 5' }
  ]);
  const { edicao, setEdicao } = useState(false);
  function salvar(data) {
    setCategoria({ categoria: data.categoria });
    console.log(categoria);
  }
  return (
    <View style={{ flex: 1, flexDirection: 'column', padding: 10 }}>
      <Controller
        control={control}
        render={({ onChange, onBlur, value }) => (
          <TextInput style={{ fontSize: 21, marginBottom: 5 }}
            onBlur={onBlur}
            label='Categoria'
            onChangeText={value => onChange(value)}
            value={value}
          />
        )}
        name="categoria"
        rules={{ required: true }}
        defaultValue=""
      />
      {errors.categoria && <Text>Digite uma categoria.</Text>}


      <Button style={{width: 130, height: 50, backgroundColor: 'blue',padding: 5, marginLeft: 10, borderRadius: 15}} onPress={handleSubmit((data) => salvar(data))}>
        
        <Text style={{alignContent: 'center', justifyContent: "space-between", color: 'white', fontSize: 25, fontWeight: "bold",marginTop: 5}}>
        <Icon style={{marginLeft: 10}} name='save' color='white' size={25}  />
          Salvar
        </Text>
        
      </Button>
      



      

      <View style={{ flex: 1, flexDirection: 'row', alignContent: 'space-between', alignItems: 'flex-start', backgroundColor: 'white' }}>
        <List
          showsVerticalScrollIndicator={false}
          data={categoriaList}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Area >
              <Text style={{ color: 'white' }}>
                {item.categoria}
              </Text>
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <ButtonMenu >
                  <Icon name='delete' color='white' size={20} />
                </ButtonMenu>
                <ButtonMenu >
                  <Icon name='edit' color='white' size={20} />
                </ButtonMenu>
              </View>
            </Area>
          )} >


        </List>
      </View>
    </View>
  );
}
