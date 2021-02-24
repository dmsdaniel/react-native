import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { List } from './style';

export default function Produto() {
    const [produto, setProduto] = useState([]);
    const [produtos, setProdutos] = useState([
        { id: '1', descricao: 'produto 1', valor: 110.20 },
        { id: '2', descricao: 'produto 2', valor: 111.20 },
        { id: '3', descricao: 'produto 3', valor: 112.20 },
        { id: '4', descricao: 'produto 4', valor: 113.20 },
        { id: '5', descricao: 'produto 5', valor: 114.20 },

    ]);

    useEffect(() => {
        function loadProdutos(){
            console.log('carregando produtos');
        }
        loadProdutos();
    },[])

    return (

        <View>
            <View style={{flexDirection: 'column', alignContent: 'space-between', alignItems: 'center'}}>
                <Text>Produtos</Text>  
                <Text>Produtos</Text>
                <Text>Produtos</Text>
                <Text>Produtos</Text>
                <Text>Produtos</Text>

            </View>
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