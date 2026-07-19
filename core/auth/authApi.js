import { apiFetch } from '../api/client';

// Endpoints de auth do backend — ajuste os caminhos e o formato do
// payload/resposta conforme a API real consumida pelo app. Reaproveita
// apiFetch (core/api/client.js) para herdar timeout, checagem de HTTPS e
// tratamento de erro já validados ali — evita duas implementações divergentes
// do mesmo fetch sensível a segurança.
// Contrato esperado (ver README > Segurança para o restante do contrato):
//   POST /auth/login  { login, senha } -> { token, user }
//   POST /auth/logout (Authorization: Bearer <token>)

export async function apiLogin(login, senha) {
  return apiFetch('/auth/login', {
    method: 'POST',
    body: JSON.stringify({ login, senha }),
  });
}

export async function apiLogout(token) {
  if (!token) return;
  try {
    await apiFetch('/auth/logout', { method: 'POST' }, token);
  } catch {
    // logout local prossegue mesmo se a chamada ao servidor falhar
  }
}
