import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../auth/AuthContext';
import LoadingView from '../ui/LoadingView';
import AppTabs from './AppTabs';
import { AuthModule } from '@modules/Auth/config/module.config';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {AuthModule.routes.map((r) => (
        <Stack.Screen key={r.name} name={r.name} component={r.component} />
      ))}
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingView />;

  return (
    <NavigationContainer>
      {user ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
