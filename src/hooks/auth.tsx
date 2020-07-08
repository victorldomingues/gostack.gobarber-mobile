import React, { createContext, FC, useCallback, useState, useContext, useEffect } from "react";
import api from "../services/api";
import AsyncStorage from "@react-native-community/async-storage";

interface AuthState {
    token: string;
    user: object;
}
interface SignCreadentials {
    email: string;
    password: string;
}
interface AuthContextData {
    user: object;
    signin(creadentials: SignCreadentials): Promise<void>;
    signout(): Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const useAuth = (): AuthContextData => {
    const context = useContext(AuthContext);
    if (!context) {
        throw Error('useAuth must be used within an AuthProvider')
    }
    return context;
}


export const AuthProvider: FC = ({ children }) => {

    const [data, setData] = useState<AuthState>({} as AuthState);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {

        async function loadStorageDate(): Promise<void> {
            const [token, user] = await AsyncStorage.multiGet(['@GoBarber:token', '@GoBarber:user']);

            if (user[1] && token[1]) {
                setData({ token: token[1], user: JSON.parse(user[1]) });
            }

            setLoading(false);
        }

        loadStorageDate();

    }, []);

    const signin = useCallback(async ({ email, password }) => {
        const response = await api.post('sessions', {
            email,
            password
        });
        console.log(response.data);
        const { token, user } = response.data;
        await AsyncStorage.multiSet([['@GoBarber:token', token], ['@GoBarber:user', JSON.stringify(user)]]);
        setData({ token, user });
    }, []);

    const signout = useCallback(async () => {
        await AsyncStorage.multiRemove(['@GoBarber:user', '@GoBarber:token']);
        setData({} as AuthState);
    }, []);

    return (<AuthContext.Provider value={{ user: data.user, signin, signout, loading }}>{children}</AuthContext.Provider>);
};
