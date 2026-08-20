import { createNavigationContainerRef } from '@react-navigation/native';

// Permite navegar de fora da árvore de telas (ex.: um componente global de
// header/menu que não recebe `navigation` como prop) sem precisar repassar
// `navigation` manualmente por todo canto. Anexado ao <NavigationContainer>
// em core/navigation/RootNavigator.js.
export const navigationRef = createNavigationContainerRef();

export function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}
