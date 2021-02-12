import React, {useState, useContext } from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Background, Container, AreaInput, Input, Logo, SubmitButton, SubmitText, Link, LinkText } from './styles';
import { AuthContext } from '../../contexts/auth';

export default function SignIn() {
  const [email,setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const { signIn } = useContext(AuthContext);

  function handleSignIn(){
    signIn(email, password);
  }
  return (
    <Background>
      <Container behavior={Platform.OS === 'ios' ? 'padding': ''} 
      enabled
      >
        <Logo source={require('../../assets/Logo.png')} />
        <AreaInput>
          <Input
            placeholder="email"
            autoCorrect={false}
            autoCapitalize="none"
            value={email}
            onChangeText={ (text) => setEmail(text)}
          />
        </AreaInput>
        <AreaInput>
          <Input
            placeholder="senha"
            autoCorrect={false}
            autoCapitalize="none"
            value={password}
            onChangeText={ (text) => setPassword(text)}
          />
        </AreaInput>
        <SubmitButton onPress={handleSignIn}>
          <SubmitText>Acessar</SubmitText>
        </SubmitButton>
        <Link onPress={ () => navigation.navigate('SignUp')}>
          <LinkText>Criar uma conta!</LinkText>
        </Link>
        
      </Container>
    </Background>
  );
}