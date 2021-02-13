import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header';
import { Background, Container, Nome, Saldo, Title } from './style';

export default function Home() {
  const { user, signOut } = useContext(AuthContext);
  return (
    <Background>
      <Header/>
      <Container>
      <Nome>{user.nome}</Nome>
      <Saldo>123123,00</Saldo>
      </Container>
      <Title>Ultimas Movimentações</Title>
    </Background>
    
  );
}