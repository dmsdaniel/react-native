import React, { useContext, useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../../contexts/auth'
import Header from '../../components/Header';
import { Background, Container, Nome, Saldo, Title, List } from './styles';
import HistoricoList from '../../components/HistoricoList';
import firebase from '../../services/firebaseConnection';
import { format } from 'date-fns'

export default function Home() {
  const [ historico, setHistorico] = useState([]);
  const [ saldo, setSaldo] = useState(0);
  const { user, signOut } = useContext(AuthContext);
  const uid = user && user.uid;

  useEffect(() => {
    async function loadList(){
      await firebase.database().ref('users').child(uid).on('value', (snapshot) => {
        setSaldo(snapshot.val().saldo);
      });
      
      await firebase.database().ref('historico')
      .child(uid)
      .orderByChild('date').equalTo(format(new Date,'dd/MM/yy'))
      .limitToLast(10)
      .on('value', (snapshot) => {
        setHistorico([]);
        snapshot.forEach((childItem) => {
          let list = {
            key: childItem.val().key,
            tipo: childItem.val().tipo,
            valor: childItem.val().valor
          };
          console.log(list);
          setHistorico(oldArray => [...oldArray, list].reverse());
        })
      })
    }
    loadList();
    
  }, []);

  return (
    <Background>
      <Header />
      <Container>
        <Nome>{user && user.nome}</Nome>
        <Saldo>R$ {saldo}</Saldo>
      </Container>
      <Title>Ultimas Movimentações</Title>
      <List
        showsVerticalScrollIndicator={false}
        data= { historico } 
        keyExtractor={ item => item.key }
        renderItem={ ({item}) => ( <HistoricoList data={item}/> )  }
      />
    </Background>

  );
}