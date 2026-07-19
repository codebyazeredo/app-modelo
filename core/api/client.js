import { getApiBaseUrl } from '../config/env';

let onUnauthorized = null;

// Registrado pelo AuthProvider (core/auth/AuthContext.js) para encerrar a
// sessão automaticamente quando o backend responder 401/403 em uma chamada
// autenticada — token expirado, revogado ou inválido não deve continuar
// "logado" na UI local.
export function setUnauthorizedHandler(handler) {
  onUnauthorized = handler;
}

// Cliente HTTP genérico. Ajuste o formato de envelope da resposta (hoje assume
// JSON simples com os dados no corpo) conforme o contrato real do seu backend.
export async function apiFetch(path, options = {}, token = null) {
  const isFormData = typeof FormData !== 'undefined' && options.body instanceof FormData;
  const headers = {
    ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
    ...(options.headers ?? {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 15000);

  let response;
  try {
    response = await fetch(`${getApiBaseUrl()}${path}`, {
      ...options,
      headers,
      signal: controller.signal,
    });
  } catch (err) {
    clearTimeout(timer);
    const msg = err.name === 'AbortError' ? 'Servidor não respondeu. Verifique a conexão.' : 'Não foi possível conectar ao servidor.';
    const netErr = new Error(msg);
    netErr.isNetwork = true;
    throw netErr;
  } finally {
    clearTimeout(timer);
  }

  let data = null;
  const raw = await response.text();
  if (raw) {
    try {
      data = JSON.parse(raw);
    } catch {
      throw new Error('Resposta inválida do servidor.');
    }
  }

  if (!response.ok) {
    if (token && (response.status === 401 || response.status === 403)) {
      onUnauthorized?.();
    }
    throw new Error(data?.message || `Erro na requisição (${response.status}).`);
  }

  return data;
}
