import React from 'react';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import { Container, Background } from './styles'

export default function Cadastros() {
    const onPress = () => console.log('onpress');
    const navigation = useNavigation();
    return (

        <Background>

            <Header />
            <Container>
                <View style={{ padding: 20, alignContent: 'flex-start', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={ () => navigation.navigate('Produtos') }
                    >
                        <Text>Produtos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onPress}
                    >
                        <Text>Press Here</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ padding: 20, alignContent: 'flex-start', justifyContent: 'space-evenly' }}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onPress}
                    >
                        <Text>Press Here</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onPress}
                    >
                        <Text>Press Here</Text>
                    </TouchableOpacity>
                </View>
            </Container>

        </Background>

    )
}

const styles = StyleSheet.create({

    button: {
        alignItems: "center",
        backgroundColor: "#DDDDDD",
        width: 150,
        height: 40,
        borderRadius: 10,
        padding: 10,
        marginTop: 20    
    },

});