import React, { useEffect, useState } from 'react';
import { useNavigation, StyleSheet } from '@react-navigation/native'
import Header from '../../components/Header';
import { View, Text, Alert, ActivityIndicator } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useForm, Controller } from "react-hook-form";
import { List, Container, Area, ButtonMenu, Button } from './style';
import { openDatabase } from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNPickerSelect from 'react-native-picker-select';
import { set } from 'react-native-reanimated';
var db = openDatabase({ name: 'UserDatabase.db' });


export default function Produto() {
    const { control, handleSubmit, errors } = useForm();
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [nomeproduto, setNomeproduto] = useState('');
    const [valor, setValor] = useState(0);
    const [produtos, setProdutos] = useState([]);
    const [categorias, setCategorias] = useState([]);
    const [atualizar, setAtualizar] = useState(true);

    useEffect(() => {
        function loadProdutos() {
            db.transaction((tx) => {
                tx.executeSql(
                    'SELECT * FROM table_produto',
                    [],
                    (tx, results) => {
                        var temp = [];
                        for (let i = 0; i < results.rows.length; ++i)
                            temp.push(results.rows.item(i));
                        setProdutos(temp);
                    }
                )
            });
        }
        function loadCategorias() {
            db.transaction((tx) => {
                tx.executeSql(
                  'SELECT * FROM table_categoria',
                  [],
                  (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i)
                      temp.push(results.rows.item(i));
                    setCategorias(temp);
                  }
                )
              });
        }
        loadProdutos();  
        loadCategorias();
        console.log(categorias);
        setAtualizar(false);

    }, [atualizar])

    function handleDelete(id) {
        db.transaction(function (tx) {
            tx.executeSql(
                'DELETE FROM table_produto WHERE id = (?)',
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

    function handleSalvar(data) {
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO table_produto (descricao) VALUES (?)',
                [data.descricao],
                (tx, results) => {
                    if (results.rowsAffected = 0) {
                        alert('Inclusao Falhou');
                    }
                }
            );
        });
        setLoading(false);
        setAtualizar(true);
    };

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

        <Container>
            <Header />
            <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                    <TextInput style={{ fontSize: 18, marginBottom: 5 }}
                        onBlur={onBlur}
                        label='Descricao'
                        onChangeText={value => onChange(value)}
                        value={value}
                    />
                )}
                name="descricao"
                rules={{ required: true }}
                defaultValue=""
            />
            {errors.descricao && <Text>Digite uma descricao.</Text>}
            <Controller
                control={control}
                render={({ onChange, onBlur, value }) => (
                    <RNPickerSelect
                        onValueChange={(value) => console.log(value)}
                        items={categorias.map(obj => (
                            {
                               key: obj.id,
                               label: obj.descricao,
                               value: obj.id,
                               color: "rgba(77,38,22,1)",
                            }))}
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
            <View style={{ flex: 1, flexDirection: 'row', alignContent: 'space-between', alignItems: 'flex-start', backgroundColor: 'white' }}>
                <List
                    showsVerticalScrollIndicator={false}
                    data={produtos}
                    keyExtractor={item => item.id}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    renderItem={({ item }) => (
                        <Area >
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
                        </Area>
                    )} >

                </List>
            </View>

        </Container>

    );

}

