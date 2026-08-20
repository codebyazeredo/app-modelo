// Mapa de nome de rota -> título amigável, usado pelo AppHeader quando a tela
// não passa `title` explicitamente. Adicione uma entrada aqui para cada nova
// tela/módulo; rotas sem entrada caem no fallback `fromRouteName`.
const SCREEN_TITLES = {
  Home: 'Início',
  Perfil: 'Perfil',
  Configuracoes: 'Configurações',
  Sync: 'Sincronização',
  TrocarSenha: 'Alterar Senha',
  Notificacoes: 'Notificações',
  Login: 'Entrar',
  RecuperarSenha: 'Recuperar Senha',
};

function fromRouteName(name) {
  if (!name) return '';
  return name.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2');
}

export function getScreenTitle(routeName) {
  return SCREEN_TITLES[routeName] ?? fromRouteName(routeName);
}
