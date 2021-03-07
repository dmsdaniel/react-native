import React, { useEffect, useState } from 'react';
import { useNavigation, StyleSheet } from '@react-navigation/native'
import Header from '../../components/Header';
import { View, Text, Button, TextInput, Alert, ActivityIndicator } from 'react-native';
import { List, Container, Area, ButtonMenu } from './style';
import { openDatabase } from 'react-native-sqlite-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { set } from 'react-native-reanimated';
var db = openDatabase({ name: 'UserDatabase.db' });


export default function Produto() {

    const [loading, setLoading] = useState(false);
    const navigation = useNavigation();
    const [nomeproduto, setNomeproduto] = useState('');
    const [valor, setValor] = useState(0);
    const [produtos, setProdutos] = useState([]);
    const [atualizar, setAtualizar] = useState(true);

    useEffect(() => {
        function loadProdutos() {
            setLoading(true);
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
            setLoading(false);
        }
        loadProdutos();
        
    }, [atualizar])

    function handleDelete(id) {
        setLoading(true);
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
        setLoading(false);
        setAtualizar(true);
    }

    let onPress = () => {

        setLoading(true);
        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO table_produto (descricao) VALUES (?)',
                [nomeproduto],
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

    return (

        <Container>
            <Header />
            <View style={{ flexDirection: 'row', alignContent: 'space-between', alignItems: 'flex-start', backgroundColor: 'green' }}>
                <TextInput style={{ borderWidth: 1, marginLeft: 10, color: '#fff' }} underlineColorAndroid="transparent"
                    placeholder="Descricao"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={(value) => setNomeproduto(value)} />
                <TextInput style={{ borderWidth: 1, marginLeft: 10, color: '#fff' }} underlineColorAndroid="transparent"
                    placeholder="Valor"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={(value) => setValor(value)} />
            </View>

            <ButtonMenu onPress={onPress} >
                <Text style={{ backgroundColor: 'blue', fontSize: 30, textAlign: 'center' }}>Salvar</Text>
            </ButtonMenu>
            <View style={{ flex: 1, flexDirection: 'row', alignContent: 'space-between', alignItems: 'flex-start', backgroundColor: 'white' }}>
                <List
                    showsVerticalScrollIndicator={false}
                    data={produtos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <Area >
                            <Text style={{ color: 'white' }}>
                                {item.descricao}

                            </Text>
                            <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                                <ButtonMenu onPress={() => handleDelete(item.id)}>
                                    <Icon name='delete' color='white' size={20} />
                                </ButtonMenu>
                                <ButtonMenu onPress={() => handleDelete(item.id)}>
                                    <Icon name='edit' color='white' size={20} />
                                </ButtonMenu>
                            </View>
                        </Area>
                    )} >

                </List>
            </View>

        </Container>

    );

}

