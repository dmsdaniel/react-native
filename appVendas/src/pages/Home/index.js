import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import Header from '../../components/Header';
import { Background, Container, Nome, Saldo, Title, List, Area } from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabase.db' });


export default function Home() {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            console.log('drop/create table');
            txn.executeSql('DROP TABLE IF EXISTS table_produto', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_produto(id INTEGER PRIMARY KEY AUTOINCREMENT, descricao VARCHAR(20))',
              []
            );
          }
        }
      );
    });
  }, [])
  return (
    <Background>
      <Header />
      <Container>
        <Nome>Daniel</Nome>
        <Saldo>Saldo</Saldo>
      </Container>
      <Area>
        <TouchableOpacity >
          <Icon name="event" size={30} color="#fff" />
        </TouchableOpacity>
        <Title>Ultimas Movimentações</Title>
      </Area>


    </Background>

  );
}