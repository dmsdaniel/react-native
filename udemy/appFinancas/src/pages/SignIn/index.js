import React from 'react';
import { View, Text } from 'react-native';
import { Background, Container, AreaInput, Input, Logo } from './styles';

export default function SignIn() {
  return (
    <Background>
      <Container>
        <Logo source={require('../../assets/Logo.png')} />
        <AreaInput>
          <Input
            placeholder="email"
            autoCorrect={false}
            autoCapitalize="none"
          />
        </AreaInput>
        <AreaInput>
          <Input
            placeholder="senha"
            autoCorrect={false}
            autoCapitalize="none"
          />
        </AreaInput>
      </Container>
    </Background>
  );
}