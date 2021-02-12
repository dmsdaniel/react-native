import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
    flex: 1;
    background-color: #131313;
    align-items: center;
`;

export const Nome = styled.Text`
    text-align: center;
    font-size: 28px;
    margin-top: 25px;
    margin-bottom: 25px;
    color: #FFF
`;

export const NewLink = styled.TouchableOpacity`
    background-color: #00b640;
    justify-content: center;
    align-items: center;
    width: 90%;
    margin-bottom: 10px;
    height: 45px;
    border-radius: 10px;
`;

export const NewText = styled.Text`
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;

export const Logout = styled.TouchableOpacity`
    background-color: #c62c36;
    justify-content: center;
    align-items: center;
    width: 90%;
    margin-bottom: 10px;
    height: 45px;
    border-radius: 10px;
`;

export const LogoutText = styled.Text`
    justify-content: center;
    font-size: 18px;
    font-weight: bold;
    color: #FFF;
`;
