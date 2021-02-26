import styled from 'styled-components';

export const Background = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: #131313;
`;

export const Container = styled.KeyboardAvoidingView`
flex: 1;
background-color: #000;
margin-bottom: 25px;
`;

export const Nome = styled.Text`
    color: #000;
    font-size: 19px;
    font-style: italic;
`;

export const Saldo = styled.Text`
    margin-top: 5px;
    color: #000;
    font-size: 30px;
    font-weight: bold;
`;

export const Title = styled.Text`
margin-left: 5px;
color: #00b94a;
font-size: 19px;
margin-bottom: 10px;
`
;

export const Area = styled.View`
flex-direction: row;
align-items: baseline;
align-content: center;
background-color: #000;
  
`
;

export const ButtonMenu = styled.TouchableWithoutFeedback`
flex: 1;
height: 50px;
justify-content: center;
align-content: center;

 `;  

export const List = styled.FlatList.attrs({
    marginHorizontal: 0
})`
    width: 100%;
    margin-top: 5;
    background-color: #FFF;   
    padding-left: 10;
    margin-right: 10;
`
;