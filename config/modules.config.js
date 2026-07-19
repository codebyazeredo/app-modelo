import { HomeModule } from '@modules/Home/config/module.config';

// Agrega as abas de todos os módulos "de conteúdo" (pós-login). Para
// adicionar um novo módulo, crie modules/<Nome>/config/module.config.js
// exportando `tabs` e faça o spread dele aqui.
export function getAppTabs() {
  return [...HomeModule.tabs];
}
