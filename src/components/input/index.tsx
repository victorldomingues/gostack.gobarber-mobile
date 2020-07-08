import React, { FC, useEffect, useRef, RefForwardingComponent, useImperativeHandle, forwardRef, useState, useCallback } from 'react';
import { Container, TextInput, Icon } from './styles';
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

interface InputProps extends TextInputProps {
    name: string;
    icon: string;
}

interface InputvalueReference {
    value: string;
}

interface InputRef {
    focus(): void;
}

const Input: RefForwardingComponent<InputRef, InputProps> = ({ name, icon, ...rest }, ref) => {

    const { registerField, defaultValue = '', fieldName, error } = useField(name);
    const inputElementRef = useRef<any>(null);
    const inputValueRef = useRef<InputvalueReference>({ value: defaultValue });

    const [isFocused, setIsFocused] = useState(false);
    const [isFilled, setIsFilled] = useState(false);

    const handleInputFocus = useCallback((data: object) => {
        setIsFocused(true);
    }, []);

    const handleInputBlur = useCallback((data: object) => {
        setIsFocused(false);
        setIsFilled(!!inputValueRef.current?.value);
    }, []);

    useImperativeHandle(ref, () => ({
        focus() {
            inputElementRef.current.focus();
        }
    }))

    useEffect(() => {
        registerField<string>({
            name: fieldName,
            ref: inputValueRef.current,
            path: 'value',
            setValue(ref: any, value) {
                inputValueRef.current.value = value;
                inputElementRef.current.setNativeProps({ text: value })
            },
            clearValue() {
                inputValueRef.current.value = '';
                inputElementRef.current.clear();
            }
        })
    }, [fieldName, registerField])

    return (
        <Container isFocused={isFocused} isErrored={!!error}>
            <Icon name={icon} size={20} color={isFocused || isFilled ? "#ff9000" : "#666360"} />
            <TextInput
                ref={inputElementRef}
                keyboardAppearance="dark"
                placeholderTextColor="#666360"
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                onChangeText={(value) => {
                    inputValueRef.current.value = value;
                }}
                {...rest} />
        </Container>
    )
};

// focus / elemento pai ter acesso ao elemento filho
export default forwardRef(Input);