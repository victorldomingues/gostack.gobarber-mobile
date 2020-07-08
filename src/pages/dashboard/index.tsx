import React, { FC } from 'react';
import { View, Button } from "react-native";
import { useAuth } from '../../hooks/auth';

const Dashboard: FC = () => {
    const { signout } = useAuth();
    return (
        <View >
            <Button title='Sair' onPress={signout} />
        </View>
    )
};

export default Dashboard;
