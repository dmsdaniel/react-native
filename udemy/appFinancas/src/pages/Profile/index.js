import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { Container, Nome, NewLink, NewText, Logout, LogoutText } from './styles';
import { AuthContext } from '../../contexts/auth';
import  Header from '../../components/Header';
export default function Profile() {
    const { user, signOut } = useContext(AuthContext);
    const navigation = useNavigation();
  
    return (
        <Container>
            <Header/>
            <Nome>
                { user && user.nome }
            </Nome>
            <NewLink>
                <NewText onPress= {() => navigation.navigate('Registrar')}>Registrar Gastos</NewText>
            </NewLink>
            <Logout>
                <LogoutText onPress={() => signOut()}>Sair</LogoutText>
            </Logout>
        </Container>
    )
}