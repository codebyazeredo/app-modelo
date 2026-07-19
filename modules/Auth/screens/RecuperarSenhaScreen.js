import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { apiFetch } from '@core/api/client';
import styles from '../styles/login';

// Tela de exemplo — troque a chamada abaixo pelo endpoint real de
// recuperação de senha do seu backend (ex: POST /auth/recuperar-senha).
export default function RecuperarSenhaScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [mensagem, setMensagem] = useState('');
  const [erro, setErro] = useState('');

  async function handleEnviar() {
    setErro('');
    setMensagem('');
    if (!email.trim()) { setErro('Informe seu e-mail.'); return; }

    setLoading(true);
    try {
      await apiFetch('/auth/recuperar-senha', {
        method: 'POST',
        body: JSON.stringify({ email: email.trim() }),
      });
      setMensagem('Se o e-mail existir, enviaremos as instruções para redefinir a senha.');
    } catch (err) {
      setErro(err.message || 'Não foi possível conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <View style={styles.scrollContent}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 16 }}>
          <MaterialCommunityIcons name="chevron-left" size={30} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.welcome}>Recuperar senha</Text>
        <Text style={styles.welcomeSub}>Informe seu e-mail cadastrado</Text>

        <View style={styles.card}>
          <View style={styles.fieldGroup}>
            <Text style={styles.fieldLabel}>E-mail</Text>
            <View style={styles.inputWrap}>
              <MaterialCommunityIcons name="email-outline" size={20} color="#6c757d" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="seu@email.com"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="username"
                autoComplete="email"
              />
            </View>
          </View>

          {erro ? <Text style={styles.errorText}>{erro}</Text> : null}
          {mensagem ? <Text style={{ color: '#198754', fontSize: 13, marginBottom: 16 }}>{mensagem}</Text> : null}

          <TouchableOpacity
            style={[styles.btnEntrar, loading && styles.btnEntrarDisabled]}
            onPress={handleEnviar}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.btnEntrarText}>Enviar</Text>
            }
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
