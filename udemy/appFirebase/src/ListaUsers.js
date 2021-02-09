import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ListaUsers( {data} ) {
    return (
        <View style={styles.container}>
            <Text style={styles.texto} >{data.nome}</Text>
            <Text style={styles.texto} >{data.cargo}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 5,
        marginBottom: 10,
        padding: 5,
        backgroundColor: 'black',
    },
    texto: { 
        fontSize: 20,
        color: 'white'

    }
})