import React from 'react';
import styled from 'styled-components';

export const Background = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: #131313;
`;

export const Container = styled.KeyboardAvoidingView`
margin-left: 15px;
margin-bottom: 25px;
`;

export const Nome = styled.Text`
    color: #FFF;
    font-size: 19px;
    font-style: italic;
`;

export const Saldo = styled.Text`
    margin-top: 5px;
    color: #FFF;
    font-size: 30px;
    font-weight: bold;
`;

export const Title = styled.Text`
margin-left: 15px;
color: #00b94a;
font-size: 19px;
margin-bottom: 10px;
`
;

export const List = styled.FlatList.attrs({
    marginHorizontal: 15
})`
padding-top: 15px;
background-color: #FFF;
border-top-left-radius: 15px;
border-top-right-radius: 15px;
margin-left: 8px;
margin-right: 8px;
`
;