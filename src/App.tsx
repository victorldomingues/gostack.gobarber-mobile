import React, { FC } from 'react';
import 'react-native-gesture-handler';
import { View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppProvider from './hooks';
import AuthRoutes from './routes';

const App: FC = () => (
    <NavigationContainer>
        <StatusBar barStyle='light-content' backgroundColor='#312e38' />
        <AppProvider>
            <View style={{ flex: 1, backgroundColor: '#312e38' }}>
                <AuthRoutes />
            </View>
        </AppProvider>
    </NavigationContainer>
);
export default App;