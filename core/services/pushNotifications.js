// Push notifications (Expo Push + FCM/APNs por baixo dos panos).
// Requer um projectId de EAS configurado (app.json > expo.extra.eas.projectId)
// e, para builds nativas, o app registrado no Firebase (Android) / APNs (iOS).
import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import Constants from 'expo-constants';
import { apiRegistrarPushToken, apiRemoverPushToken } from './pushApi';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

function getProjectId() {
  return Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId ?? null;
}

// Pede permissão, gera o token Expo do dispositivo e registra no backend.
// Retorna o token gerado (ou null se não foi possível — dispositivo sem suporte,
// permissão negada, ou faltando configuração de projectId).
export async function registrarPushToken(sessionToken) {
  if (!Device.isDevice) return null;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#1d4ed8',
    });
  }

  const { status: statusAtual } = await Notifications.getPermissionsAsync();
  let status = statusAtual;
  if (status !== 'granted') {
    const resultado = await Notifications.requestPermissionsAsync();
    status = resultado.status;
  }
  if (status !== 'granted') return null;

  const projectId = getProjectId();
  if (!projectId) return null;

  let expoPushToken;
  try {
    const resultado = await Notifications.getExpoPushTokenAsync({ projectId });
    expoPushToken = resultado.data;
  } catch {
    return null;
  }

  try {
    await apiRegistrarPushToken(sessionToken, expoPushToken, Platform.OS);
  } catch {
    // Best-effort — falha ao registrar no backend não deve travar o login/uso do app.
  }

  return expoPushToken;
}

export async function removerPushToken(sessionToken, expoPushToken) {
  if (!expoPushToken) return;
  try {
    await apiRemoverPushToken(sessionToken, expoPushToken);
  } catch {
  }
}
