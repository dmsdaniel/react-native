import React from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { Container , Tipo, IconView, TipoText, ValorText} from './style';

export default function HistoricoList( { data }) {
 return (
   <Container>
     <Tipo>
       <IconView tipo={data.tipo}>
         <Icon 
         name={data.tipo === 'despesa' ? 'arrow-down' : 'arrow-up'} 
         color="#FFFF" 
         size={30}></Icon>
         <TipoText>{data.tipo}</TipoText>
       </IconView>
     </Tipo>
     <ValorText>R$ {data.valor.toFixed(2)}</ValorText>
   </Container>
  );
}