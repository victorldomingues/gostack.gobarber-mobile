import React, { FC } from 'react';
import { useAuth } from '../hooks/auth';
import AuthRoutes from './auth.routes';
import AppRoutes from './app.routes';
import { ActivityIndicator, View } from 'react-native';

const Routes: FC = () => {
    const { user, loading } = useAuth();

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size='large' color='#999' />
            </View>
        )
    }

    return user ? <AppRoutes /> : <AuthRoutes />;
};

export default Routes;

