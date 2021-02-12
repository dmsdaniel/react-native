import React, { useContext } from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from '../../contexts/auth'
export default function Home() {
  const { user, signOut } = useContext(AuthContext);
  return (
    <View>
      <Text>{user.uid}</Text>
      <Text>{user.nome}</Text>
      <Text>{user.email}</Text>
      <Button onPress={ () =>signOut() } title="Logout"></Button>
    </View>
    
  );
}