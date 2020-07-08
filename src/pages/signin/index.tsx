import React, { FC, useCallback, useRef } from "react";
import { Container, Title, ForgotPassword, ForgotPasswordText, CreateAccountButton, CrateAccountButtonText } from "./styles";
import logoImg from '../../assets/logo.png'; /*@types*/
import { Image, KeyboardAvoidingView, Platform, View, ScrollView, TextInput, Alert } from "react-native";
import Input from "../../components/input";
import Button from "../../components/button";
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from "@react-navigation/native";
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import * as Yup from 'yup';
import getValidationErrors from "../../utils/get-validation-erros";
import { useAuth } from "../../hooks/auth";


interface SignInFormData {
    email: string;
    password: string;
}

const Signin: FC = () => {
    const { signin, user } = useAuth();
    const passwordInputRef = useRef<TextInput>(null);
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();
    const handleSignin = useCallback(async (data: SignInFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                email: Yup.string().required('Email  obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No minimo 6 digitos')
            });
            await schema.validate(data, {
                abortEarly: false,
            })
            await signin(data);

            // history.push('/dashboard')

        } catch (err) {

            console.log(err);

            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
            }

            Alert.alert('Erro ao realizar login!', 'Ocorreu um erro ao fazer login, cheque as credenciais');


        }

    }, []);
    return (
        <>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined
                } enabled>
                <ScrollView keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{ flex: 1 }}>
                    <Container >
                        <Image source={logoImg} />
                        <View>
                            <Title>Faça seu Logon</Title>
                        </View>
                        <Form ref={formRef} onSubmit={handleSignin}>
                            <Input name="email" icon="mail" placeholder="E-mail"
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='email-address'
                                returnKeyType='next'
                                onSubmitEditing={() => { passwordInputRef.current?.focus() }}
                            />
                            <Input ref={passwordInputRef} name="password" icon="lock" placeholder="Senha"
                                secureTextEntry
                                returnKeyType='send'
                                onSubmitEditing={() => { formRef.current?.submitForm() }} />
                        </Form>
                        <Button onPress={() => { formRef.current?.submitForm() }} >Entrar</Button>

                        <ForgotPassword onPress={() => (navigation.navigate('Signup'))}>
                            <ForgotPasswordText> Esqueci minha senha</ForgotPasswordText>
                        </ForgotPassword>
                    </Container >
                </ScrollView>
            </KeyboardAvoidingView>
            <CreateAccountButton onPress={() => (navigation.navigate('Signup'))}>
                <Icon name="log-in" size={20} color="#ff9000" />
                <CrateAccountButtonText>Criar uma conta</CrateAccountButtonText>
            </CreateAccountButton>
        </>);
}

export default Signin;