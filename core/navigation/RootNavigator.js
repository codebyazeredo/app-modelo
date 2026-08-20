import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useAuth } from '../auth/AuthContext';
import LoadingView from '../ui/LoadingView';
import AppTabs from './AppTabs';
import { navigationRef } from './navigationRef';
import SyncScreen from '../offline/SyncScreen';
import { registrarPushToken } from '../services/pushNotifications';
import { AuthModule } from '@modules/Auth/config/module.config';
import TrocarSenhaScreen from '@modules/Home/screens/TrocarSenhaScreen';

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

// Empilha, sobre as abas principais, telas que precisam ser "empurradas"
// (com goBack) em vez de viverem como aba — ex.: gerenciar a fila offline ou
// alterar senha. Para adicionar uma nova, inclua um Stack.Screen aqui e um
// título em core/navigation/screenTitles.js.
function MainStack() {
  const { token } = useAuth();

  // Registra o token de push assim que há uma sessão válida — best-effort,
  // não bloqueia nem interrompe o uso do app se falhar.
  useEffect(() => {
    if (token) {
      registrarPushToken(token).catch(() => {});
    }
  }, [token]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Tabs" component={AppTabs} />
      <Stack.Screen name="Sync" component={SyncScreen} />
      <Stack.Screen name="TrocarSenha" component={TrocarSenhaScreen} />
    </Stack.Navigator>
  );
}

export default function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) return <LoadingView />;

  return (
    <NavigationContainer ref={navigationRef}>
      {user ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
