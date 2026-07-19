// Ponto único de configuração da API. Ajuste o valor padrão ou defina
// EXPO_PUBLIC_API_URL no .env (veja .env.example) para apontar para o seu backend.
const DEFAULT_API_URL = 'http://localhost:3000';

const isLocalUrl = (url) => /^https?:\/\/(localhost|127\.0\.0\.1|10\.|192\.168\.|::1)/i.test(url);

export function getApiBaseUrl() {
  const url = process.env.EXPO_PUBLIC_API_URL || DEFAULT_API_URL;

  // Em build de produção, nunca deixa o app enviar login/token em texto
  // plano — falha cedo em vez de vazar credenciais na rede.
  if (!__DEV__ && !url.startsWith('https://')) {
    throw new Error('EXPO_PUBLIC_API_URL precisa ser HTTPS em produção. Configure a URL segura antes de gerar o build.');
  }
  if (__DEV__ && !url.startsWith('https://') && !isLocalUrl(url)) {
    console.warn('[env] EXPO_PUBLIC_API_URL não usa HTTPS. Aceitável apenas para desenvolvimento local — nunca aponte assim para produção.');
  }

  return url;
}
