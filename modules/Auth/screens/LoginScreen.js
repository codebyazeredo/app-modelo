import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { apiLogin } from '@core/auth/authApi';
import { useAuth } from '@core/auth/AuthContext';
import styles from '../styles/login';

export default function LoginScreen({ navigation }) {
  const { signIn } = useAuth();

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [senhaVisible, setSenhaVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const senhaRef = useRef(null);

  async function handleLogin() {
    setLoginError('');
    if (!login.trim()) { setLoginError('Informe seu usuário ou e-mail.'); return; }
    if (!senha.trim()) { setLoginError('Informe sua senha.'); return; }

    setLoading(true);
    try {
      const data = await apiLogin(login.trim(), senha);
      await signIn(data.user, data.token);
    } catch (err) {
      setLoginError(err.message || 'Erro ao fazer login.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.welcome}>Bem-vindo</Text>
          <Text style={styles.welcomeSub}>Acesse sua conta para continuar</Text>

          <View style={styles.card}>
            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Usuário ou e-mail</Text>
              <View style={[styles.inputWrap, loginError && !login.trim() && styles.inputWrapError]}>
                <MaterialCommunityIcons name="account-outline" size={20} color="#6c757d" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Digite seu usuário ou e-mail"
                  value={login}
                  onChangeText={(v) => { setLogin(v); setLoginError(''); }}
                  returnKeyType="next"
                  onSubmitEditing={() => senhaRef.current?.focus()}
                  blurOnSubmit={false}
                  autoCapitalize="none"
                  autoCorrect={false}
                  textContentType="username"
                  autoComplete="username"
                />
              </View>
            </View>

            <View style={styles.fieldGroup}>
              <Text style={styles.fieldLabel}>Senha</Text>
              <View style={[styles.inputWrap, loginError && !senha.trim() && styles.inputWrapError]}>
                <MaterialCommunityIcons name="lock-outline" size={20} color="#6c757d" style={styles.inputIcon} />
                <TextInput
                  ref={senhaRef}
                  style={styles.input}
                  value={senha}
                  onChangeText={(v) => { setSenha(v); setLoginError(''); }}
                  secureTextEntry={!senhaVisible}
                  placeholder="Digite sua senha"
                  returnKeyType="done"
                  onSubmitEditing={handleLogin}
                  textContentType="password"
                  autoComplete="password"
                />
                <TouchableOpacity
                  style={styles.eyeBtn}
                  onPress={() => setSenhaVisible((v) => !v)}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                >
                  <MaterialCommunityIcons
                    name={senhaVisible ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color="#6c757d"
                  />
                </TouchableOpacity>
              </View>
            </View>

            {loginError ? (
              <View style={styles.errorBox}>
                <MaterialCommunityIcons name="alert-circle-outline" size={15} color="#dc3545" />
                <Text style={styles.errorText}>{loginError}</Text>
              </View>
            ) : null}

            <TouchableOpacity
              style={[styles.btnEntrar, loading && styles.btnEntrarDisabled]}
              onPress={handleLogin}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading
                ? <ActivityIndicator color="#fff" />
                : (
                  <View style={styles.btnEntrarInner}>
                    <Text style={styles.btnEntrarText}>Entrar</Text>
                    <MaterialCommunityIcons name="arrow-right" size={20} color="#fff" />
                  </View>
                )
              }
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.linkBtn} onPress={() => navigation.navigate('RecuperarSenha')}>
            <Text style={styles.linkText}>Esqueci minha senha</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
