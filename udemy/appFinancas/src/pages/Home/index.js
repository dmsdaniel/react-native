import React, { useContext, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header';
import { Background, Container, Nome, Saldo, Title, List } from './style';
import HistoricoList from '../../components/HistoricoList';

export default function Home() {
  const [ historico, setHistorico] = useState([
    {key: '1', tipo: 'receita', valor: 1200 },
    {key: '2', tipo: 'receita', valor: 600 },
    {key: '3', tipo: 'despesa', valor: 20 },
    {key: '4', tipo: 'receita', valor: 15 },
    {key: '5', tipo: 'receita', valor: 40 },
    {key: '6', tipo: 'despesa', valor: 40 },
    {key: '7', tipo: 'despesa', valor: 89.68 },


  ])
  const { user, signOut } = useContext(AuthContext);
  return (
    <Background>
      <Header />
      <Container>
        <Nome>{user.nome}</Nome>
        <Saldo>123123,00</Saldo>
      </Container>
      <Title>Ultimas Movimentações</Title>
      <List
        showsVerticalScrollIndicator={false}
        data={ historico }
        keyExtractor={ item => item.key }
        renderItem={ ({item}) => ( <HistoricoList data={item}/> )  }
      />
    </Background>

  );
}