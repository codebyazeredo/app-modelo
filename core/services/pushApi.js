import { apiFetch } from '../api/client';

// Endpoints de push do backend — ajuste os caminhos conforme o contrato real da API.
export const apiRegistrarPushToken = (token, expoPushToken, plataforma) =>
  apiFetch('/push/registrar-token', {
    method: 'POST',
    body: JSON.stringify({ token: expoPushToken, plataforma }),
  }, token);

export const apiRemoverPushToken = (token, expoPushToken) =>
  apiFetch('/push/remover-token', {
    method: 'POST',
    body: JSON.stringify({ token: expoPushToken }),
  }, token);
