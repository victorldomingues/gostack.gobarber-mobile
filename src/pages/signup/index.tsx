import React, { FC, useCallback, useRef, useState } from "react";
import { Container, Title, BackToSignin, BackToSignText } from "./styles";
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
import api from "../../services/api";

interface SignupFormData {
    name: string;
    email: string;
    password: string;
}

const Signup: FC = () => {

    const navigation = useNavigation();
    const formRef = useRef<FormHandles>(null);
    const emailInputRef = useRef<TextInput>(null);
    const passwordInputRef = useRef<TextInput>(null);

    const handleSignup = useCallback(async (data: SignupFormData) => {
        try {
            formRef.current?.setErrors({});
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório'),
                email: Yup.string().required('Email  obrigatório').email('Digite um e-mail válido'),
                password: Yup.string().min(6, 'No minimo 6 digitos')
            });
            await schema.validate(data, {
                abortEarly: false,
            })

            await api.post('/users', data);

            Alert.alert('Cadastro realizado!', 'Você ja pode fazer seu seu logon no GoBarber!');

            navigation.goBack();

        } catch (err) {

            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                formRef.current?.setErrors(errors);
            }

            Alert.alert('Erro ao realizar cadastro!', 'Ocorreu um erro ao fazer cadastro, cheque as informações.');

        }
    }, [navigation]);
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
                            <Title>Crie sua conta</Title>
                        </View>
                        <Form ref={formRef} onSubmit={handleSignup}>
                            <Input name="name" icon="user" placeholder="Nome"
                                autoCapitalize='words'
                                autoCorrect={false}
                                returnKeyType='next'
                                onSubmitEditing={() => { emailInputRef.current?.focus() }} />
                            <Input ref={emailInputRef} name="email" icon="mail" placeholder="E-mail"
                                autoCapitalize='none'
                                autoCorrect={false}
                                keyboardType='email-address'
                                returnKeyType='next'
                                onSubmitEditing={() => { passwordInputRef.current?.focus() }} />
                            <Input ref={passwordInputRef} name="password" icon="lock" placeholder="Senha"
                                secureTextEntry
                                returnKeyType='send'
                                textContentType='newPassword'
                                onSubmitEditing={() => { formRef.current?.submitForm() }} />
                        </Form>
                        <Button onPress={() => { formRef.current?.submitForm() }} >Entrar</Button>
                    </Container >
                </ScrollView>
            </KeyboardAvoidingView>
            <BackToSignin onPress={() => navigation.navigate('Signin')}>
                <Icon name="arrow-left" size={20} color="#fff" />
                <BackToSignText>Voltar para logon </BackToSignText>
            </BackToSignin>
        </>);
}

export default Signup;