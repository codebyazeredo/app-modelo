# App Modelo

Esqueleto Expo genérico e reutilizável para novos apps: já vem com login/auth,
persistência de sessão, uma camada offline básica e navegação funcionando.
A ideia é copiar esta pasta para começar um projeto novo e só substituir as
telas de exemplo (módulo `Home`) pela regra de negócio real.

## Como rodar

```
npm install
cp .env.example .env   # ajuste EXPO_PUBLIC_API_URL para a sua API
npx expo start
```

Abra no Expo Go (Android/iOS) ou pressione `w` para rodar no navegador.

## Estrutura

```
core/            camada compartilhada — NÃO deve conter regra de negócio
  api/client.js      cliente HTTP genérico (apiFetch)
  auth/              AuthContext (login/logout/sessão) + authApi
  config/env.js      leitura da URL da API
  navigation/        RootNavigator (auth) e AppTabs (bottom tabs pós-login)
  offline/           outbox + cache sobre AsyncStorage + OfflineContext
  services/storage.js  SecureStore (nativo) / localStorage (web)
  styles/common.js   tokens de estilo reutilizáveis entre telas
  theme/colors.js    paleta de cores
  ui/                componentes de UI (AppHeader, Footer, ErrorView, ...)

modules/
  Auth/              telas de login e recuperação de senha
  Home/              MÓDULO DE EXEMPLO — troque pelas telas do app real

config/
  modules.config.js  agrega as abas de cada módulo em getAppTabs()
```

Imports: código dentro de `core/` usa caminhos relativos entre si; qualquer
outro lugar usa os aliases `@core`, `@modules`, `@config`, `@assets`
(configurados em `metro.config.js` e `jsconfig.json`).

## Como adicionar um módulo novo

1. Crie `modules/<Nome>/{screens,styles,config}`.
2. Em `modules/<Nome>/config/module.config.js`, exporte `tabs` (mesmo formato
   de `modules/Home/config/module.config.js`) se as telas devem virar abas,
   ou `routes` (formato de `modules/Auth/config/module.config.js`) se for um
   stack separado (ex.: fluxo antes do login).
3. Se for aba pós-login, importe e faça o spread em
   `config/modules.config.js` (`getAppTabs`).

O módulo `Home` é só um exemplo — pode ser apagado/substituído inteiramente.

## Contrato esperado da API

O app assume um backend REST genérico com token Bearer. Ajuste
`core/auth/authApi.js` e `core/api/client.js` se o seu backend usar outro
formato.

- `POST /auth/login` — body `{ login, senha }` → `200 { token, user }`
  (qualquer erro deve retornar status não-2xx e, se possível, `{ message }`)
- `POST /auth/logout` — header `Authorization: Bearer <token>`
- Demais chamadas autenticadas: header `Authorization: Bearer <token>`,
  feitas via `apiFetch(path, options, token)` (`core/api/client.js`).

`user` é armazenado como veio do backend e fica disponível via `useAuth()`
(`core/auth/AuthContext.js`). Ajuste os campos usados nas telas de exemplo
(`modules/Home/screens/PerfilScreen.js` usa `user.nome`/`user.email`) para o
formato real do seu backend.

## Offline

O app segue o padrão **outbox** (fila de escrita) + **cache** (leitura),
tudo sobre `AsyncStorage`, em `core/offline/`. É a parte do esqueleto que
mais vale entender antes de expandir, porque é fácil usar errado e achar
que "funciona offline" quando na verdade só funciona online.

### Como funciona

Quatro peças, cada uma com uma responsabilidade:

- **`outbox.js`** — fila de requisições de **escrita** pendentes
  (`POST`/`PUT`/`DELETE`). Cada item tem `{ id, endpoint, method, body,
  label, status, error, tries, createdAt }`. `status` começa em `'pending'`
  e vira `'error'` se o servidor recusar a requisição (ex.: validação
  falhou) — fica só em `'pending'` enquanto o problema for falta de rede.
- **`cache.js`** — cache simples de **leitura**: `cacheSet(key, value)` /
  `cacheGet(key)` / `cacheRemove(key)`, com timestamp (`savedAt`) de quando
  foi salvo. Serve para mostrar o último dado conhecido quando não há
  conexão.
- **`syncManager.js`** — a função `sincronizar(token)` percorre os itens
  `pending` do outbox, chama `apiFetch` para cada um, remove os que deram
  certo, marca como `error` os que o servidor rejeitou, e **para
  imediatamente** (sem marcar erro) no primeiro item que falhar por falta
  de rede (`err.isNetwork`) — evita marcar tudo como erro só porque a
  conexão caiu no meio da sincronização.
- **`OfflineContext.js`** — expõe tudo isso via `useOffline()`: `itens`,
  `pendentes` (contagem), `syncing`, `sync(token)`, `remover(id)`,
  `limparErros()`. É o que a tela `modules/Home/screens/ConfiguracoesScreen.js`
  usa para mostrar quantos itens estão pendentes e disparar a sincronização.

Hoje a sincronização é **manual** (botão "Sincronizar agora") — não há
listener de reconexão de rede nem sync em background. Isso é intencional
para manter o esqueleto simples; veja "Como expandir" abaixo para adicionar
isso quando o app real precisar.

### Como usar

**Enfileirar uma escrita que deve sobreviver offline** (em vez de chamar
`apiFetch` direto na tela):

```js
import { outboxEnqueue } from '@core/offline/outbox';

await outboxEnqueue({
  endpoint: '/tarefas',
  method: 'POST',
  body: { titulo: 'Nova tarefa' },
  label: 'Nova tarefa', // texto mostrado na UI de pendências, se você exibir
});
```

O item fica na fila até alguém chamar `useOffline().sync(token)` (o botão
em Configurações já faz isso) — em caso de sucesso ele some da fila
sozinho.

**Cachear uma leitura para exibir algo quando estiver offline:**

```js
import { cacheGet, cacheSet } from '@core/offline/cache';
import { apiFetch } from '@core/api/client';

async function carregarTarefas(token) {
  try {
    const data = await apiFetch('/tarefas', {}, token);
    await cacheSet('tarefas', data);
    return data;
  } catch (err) {
    if (err.isNetwork) {
      const cached = await cacheGet('tarefas');
      if (cached) return cached.value; // dado desatualizado, mas mostra algo
    }
    throw err;
  }
}
```

### Como expandir

- **Sync automático ao reconectar**: instale `@react-native-community/netinfo`
  e, no `OfflineProvider` (`core/offline/OfflineContext.js`), assine
  `NetInfo.addEventListener` chamando `sync(token)` quando `isConnected`
  virar `true`. Hoje isso depende do usuário apertar o botão.
- **Ações otimistas**: para a UI não "travar" esperando rede, atualize o
  estado local/tela imediatamente ao enfileirar (`outboxEnqueue`) e só
  reverta se a sincronização depois marcar aquele item como `'error'`.
- **Ler `err.isNetwork` nas telas**: qualquer erro de rede lançado por
  `apiFetch` (`core/api/client.js`) tem `isNetwork: true` — use isso para
  decidir quando cair para `cacheGet` em vez de mostrar uma tela de erro.
- **Retry com backoff**: `outbox.js` já guarda `tries` (quantas vezes
  tentou); dá pra usar esse número para espaçar novas tentativas
  automáticas em vez de tentar sempre no próximo `sync()`.
- **Criptografar o conteúdo sensível**: outbox e cache guardam tudo em
  texto puro no `AsyncStorage` (ver seção Segurança). Se o app real
  manipular dados sensíveis offline, considere cifrar o `body`/`value`
  antes de `outboxEnqueue`/`cacheSet` e decifrar ao sincronizar/ler.
- **Separar filas por domínio**: se o app tiver muitos tipos de escrita
  offline, adicione um campo (ex.: `tipo`) ao item do outbox e filtre por
  ele nas telas — a estrutura de dados já suporta campos extras.
- **Não precisa de offline?** Apague `core/offline/`, remova
  `OfflineProvider` de `App.js` e o bloco de sincronização de
  `modules/Home/screens/ConfiguracoesScreen.js`.

## Renomear o app para um projeto novo

Em `app.json`, ajuste `expo.name`, `expo.slug` e `expo.android.package` /
`expo.ios.bundleIdentifier`. Troque os ícones em `assets/` pelos do novo app.

## Segurança

### Já implementado no esqueleto

- **HTTPS obrigatório em produção**: `core/config/env.js` recusa subir
  (`throw`) se `EXPO_PUBLIC_API_URL` não começar com `https://` fora de
  desenvolvimento local. Em dev, `http://` só é aceito para
  `localhost`/`127.0.0.1`/rede local — qualquer outro endereço `http://` gera
  um aviso no console.
- **Token de sessão**: guardado com `expo-secure-store` (Keychain/Keystore
  criptografado pelo SO) em iOS/Android. **No Web cai para `localStorage`**
  (`core/services/storage.js`), que é acessível por qualquer script rodando
  na página — se o app for levado a sério na web, considere trocar para
  autenticação via cookie `httpOnly` (exige mudança no backend).
- **Auto-logout em sessão inválida**: `apiFetch` (`core/api/client.js`)
  aciona automaticamente `signOut()` quando uma chamada autenticada recebe
  `401`/`403` — o usuário não fica "preso" numa sessão com token expirado ou
  revogado.
- **`EXPO_PUBLIC_*` não é secreto**: qualquer variável com esse prefixo fica
  embutida em texto no bundle final do app (visível a quem descompilar).
  Nunca coloque API keys/secrets ali — só valores que já seriam públicos.
- **Autofill nativo**: os campos de usuário/senha usam
  `textContentType`/`autoComplete` corretos para que o gerenciador de senhas
  do sistema (Keychain/Google Password Manager) funcione — incentiva senhas
  únicas e fortes em vez de desabilitar o autofill.
- **Outbox offline em texto puro**: `core/offline/outbox.js` guarda os
  corpos das requisições pendentes no `AsyncStorage` (não criptografado,
  diferente do token). Se o app real for lidar com dados sensíveis offline,
  avalie criptografar o conteúdo antes de salvar ou remover a camada
  offline.

### Contrato de segurança esperado do backend (a ser desenvolvido)

Quando a API real for construída, para manter o mesmo padrão de segurança
fim-a-fim ela deve garantir:

- **HTTPS obrigatório** (HSTS habilitado), sem fallback para HTTP.
- **Tokens de curta duração** (ex.: JWT de 15–60 min) com **refresh token**
  rotativo, em vez de um token único de vida longa — reduz o estrago de um
  token vazado. O client já está pronto para tratar `401` reativamente
  (auto-logout); se adotar refresh token, é só trocar a implementação de
  `signIn`/`apiFetch` para tentar um refresh antes de deslogar.
- **Rate limiting / lockout** no login (por IP e por conta) contra
  força-bruta, e respostas de erro **genéricas** ("credenciais inválidas",
  nunca "usuário não existe" vs. "senha errada").
- **Hash de senha** com algoritmo lento (bcrypt/argon2), nunca em texto
  puro nem hash rápido (MD5/SHA1/SHA256 puro).
- **CORS restrito** à(s) origem(ns) real(is) do app (e do painel web, se
  houver), nunca `*` em endpoint autenticado.
- **Validação de entrada no servidor** (nunca confiar apenas na validação
  do app) e queries parametrizadas (proteção contra SQL/NoSQL injection).
- **Headers de segurança** em qualquer superfície web associada (CSP,
  `X-Content-Type-Options: nosniff`, `X-Frame-Options`, etc.).
- **Logs sem dados sensíveis** — nunca logar senha, token completo ou
  corpo de requisições de auth.

---

Desenvolvido e mantido por: [@codebyazeredo](https://github.com/codebyazeredo)
