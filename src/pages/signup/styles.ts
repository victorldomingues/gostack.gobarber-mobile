import styled from 'styled-components/native';

export const Container = styled.View`
    flex:1;
    align-items: center;
    justify-content: center;
    padding: 0 30px 100px;
`;

export const Title = styled.Text`
    font-size: 20px;
    color: #f4ede8;
    font-family: 'RobotoSlab-Medium';
    margin: 64px  0  24px;
`;

export const ForgotPassword = styled.TouchableOpacity`
    margin-top:24px;
`;
export const ForgotPasswordText = styled.Text`
    color: #f4ede8;
    font-family: 'RobotoSlab-Regular';
    font-size:16px;
`;

export const BackToSignin = styled.TouchableOpacity`
    position: absolute;
    background: #312e38;
    margin-top: 24px;
    left: 0;
    right: 0;
    bottom: 0;
    border-top-width: 1px;
    border-color: #232129;
    padding: 16px 0;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    z-index: 10;
`;
export const BackToSignText = styled.Text`
    color: #fff;
    font-family: 'RobotoSlab-Regular';
    font-size:18px;
    margin-left: 16px;
`;

