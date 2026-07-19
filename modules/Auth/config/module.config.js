import LoginScreen from '../screens/LoginScreen';
import RecuperarSenhaScreen from '../screens/RecuperarSenhaScreen';

export const AuthModule = {
  name: 'Auth',
  routes: [
    { name: 'Login', component: LoginScreen },
    { name: 'RecuperarSenha', component: RecuperarSenhaScreen },
  ],
};
