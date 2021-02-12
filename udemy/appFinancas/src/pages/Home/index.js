import React, { useContext } from 'react';
import { View, Text } from 'react-native';
import { AuthContext } from '../../contexts/auth'
export default function Home() {
  const { user } = useContext(AuthContext);
  return (
    <View>
      <Text>{user.uid}</Text>
      <Text>{user.nome}</Text>
      <Text>{user.email}</Text>
    </View>
  );
}