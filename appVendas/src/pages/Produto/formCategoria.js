import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import { TextInput } from 'react-native-paper';
import Header from '../../components/Header';
import { useForm, Controller } from "react-hook-form";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { List, Area, ButtonMenu, Button } from './style';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });

export default function App() {
  const { control, handleSubmit, errors } = useForm();
  const [categoria, setCategoria] = useState({ categoria: '', id: '' });
  const [loading, setLoading] = useState(false);
  const [categoriaList, setCategoriaList] = useState([]);
  const [atualizar, setAtualizar] = useState(false);
  const { edicao, setEdicao } = useState(false);

  useEffect(() => {
    function loadCategorias() {
      setLoading(true);
      db.transaction((tx) => {
        tx.executeSql(
          'SELECT * FROM table_categoria',
          [],
          (tx, results) => {
            var temp = [];
            for (let i = 0; i < results.rows.length; ++i)
              temp.push(results.rows.item(i));
            setCategoriaList(temp);
          }
        )
      });
      setAtualizar(false);


    }
    loadCategorias();
    
  }, [atualizar])

  function  handleSalvar(data) {
    setLoading(true);
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO table_categoria (descricao) VALUES (?)',
        [data.categoria],
        (tx, results) => {
          if (results.rowsAffected = 0) {
            alert('Inclusao Falhou');
          }
        }
      );
    });
    setAtualizar(true);
  };

  function handleDelete(id) {
    setLoading(true);
    db.transaction(function (tx) {
        tx.executeSql(
            'DELETE FROM table_categoria WHERE id = (?)',
            [id],
            (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                    alert('Excluido com sucesso!');
                }
            }
        );
    });
    setAtualizar(true);
}


  const FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 2,
          width: "100%",
          backgroundColor: "gray",
        }}
      />
    );
  }

  return (
    
    
    <View style={{ flex: 1, flexDirection: 'column', padding: 10,backgroundColor: "#000" }}>
      <Header />
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


      <Button style={{ width: 130, height: 50, backgroundColor: 'blue', padding: 5, marginLeft: 10, borderRadius: 15 }} onPress={handleSubmit((data) => handleSalvar(data))}>

        <Text style={{ alignContent: 'center', justifyContent: "space-between", color: 'white', fontSize: 25, fontWeight: "bold", marginTop: 5 }}>
          <Icon style={{ marginLeft: 10 }} name='save' color='white' size={25} />
          Salvar
        </Text>

      </Button>

      <View style={{ flex: 1, flexDirection: 'column', alignContent: 'space-between', alignItems: 'flex-start', backgroundColor: 'white' }}>
        <List
          showsVerticalScrollIndicator={false}
          data={categoriaList}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={FlatListItemSeparator}
          renderItem={({ item }) => (
            <Area >

              <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                <Text style={{ color: '#000', width: '90%' }}>
                  {item.descricao}
                </Text>
                <ButtonMenu onPress={() => handleDelete(item.id)}>
                  <Icon name='delete' color='black' size={20} />
                </ButtonMenu>
                <ButtonMenu >
                  <Icon name='edit' color='black' size={20} />
                </ButtonMenu>

              </View>
            </Area>
          )} >


        </List>
      </View>
    </View>
  );
}
