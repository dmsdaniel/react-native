import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text } from 'react-native';
import { Container, Nome, NewLink, NewText, Logout, LogoutText } from './styles';
import { AuthContext } from '../../contexts/auth';


export default function Profile() {
    const { user, signOut } = useContext(AuthContext);
    const navigation = useNavigation();
  
    return (
        <Container>
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