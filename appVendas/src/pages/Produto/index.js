import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native'
import { View, Text, Button, TextInput, Alert } from 'react-native';
import { List } from './style';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabase.db' });


export default function Produto() {

    const navigation = useNavigation();
    const [nomeproduto, setNomeproduto] = useState('');
    const [valor, setValor] = useState(0);
    const [produtos, setProdutos] = useState([]);

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
        loadProdutos();
    }, [])



    let onPress = () => {
        console.log({ nomeproduto }, { valor });

        db.transaction(function (tx) {
            tx.executeSql(
                'INSERT INTO table_produto (descricao) VALUES (?)',
                [nomeproduto],
                (tx, results) => {
                    console.log('Results asdadasd', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        Alert.alert(
                            'Success',
                            'You are Registered Successfully',
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => navigation.navigate('Produtos'),
                                },
                            ],
                            { cancelable: false }
                        );
                    } else alert('Registration Failed');
                }
            );
        });
    };

    return (

        <View>
            <View style={{ flexDirection: 'row', alignContent: 'space-between', alignItems: 'flex-start' }}>
                <TextInput style={{ borderWidth: 1, marginLeft: 10 }} underlineColorAndroid="transparent"
                    placeholder="Descricao"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={(value) => setNomeproduto(value)} />
                <TextInput style={{ borderWidth: 1, marginLeft: 10 }} underlineColorAndroid="transparent"
                    placeholder="Valor"
                    placeholderTextColor="#9a73ef"
                    autoCapitalize="none"
                    onChangeText={(value) => setValor(value)} />
            </View>
            <Button title='Salvar' onPress={onPress}></Button>
            <View >
                <List
                    showsVerticalScrollIndicator={false}
                    data={produtos}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (<Text>{item.descricao}</Text>)}
                />
            </View>

        </View>

    );
}