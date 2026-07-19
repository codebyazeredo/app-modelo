import HomeScreen from '../screens/HomeScreen';
import PerfilScreen from '../screens/PerfilScreen';
import ConfiguracoesScreen from '../screens/ConfiguracoesScreen';

// Módulo de exemplo — troque/expanda estas telas pela regra de negócio do
// app real. Cada entrada vira uma aba em core/navigation/AppTabs.js.
export const HomeModule = {
  name: 'Home',
  tabs: [
    { name: 'Home', component: HomeScreen, label: 'Início', icon: 'home-outline' },
    { name: 'Perfil', component: PerfilScreen, label: 'Perfil', icon: 'account-outline' },
    { name: 'Configuracoes', component: ConfiguracoesScreen, label: 'Ajustes', icon: 'cog-outline' },
  ],
};
