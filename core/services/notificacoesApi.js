import { apiFetch } from '../api/client';

// Endpoints de notificações do backend — ajuste os caminhos conforme o
// contrato real da API. `apiGetNotificacoes` espera `{ notificacoes: [...] }`,
// cada item no formato `{ id, tipo, titulo, mensagem, data_criacao, lida }`.
export const apiGetNotificacoes = (token) =>
  apiFetch('/notificacoes', {}, token);

export const apiMarcarNotificacaoLida = (token, id) =>
  apiFetch(`/notificacoes/marcar-lida/${id}`, { method: 'POST' }, token);

export const apiMarcarTodasNotificacoesLidas = (token) =>
  apiFetch('/notificacoes/marcar-todas-lidas', { method: 'POST' }, token);
