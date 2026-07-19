import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function ErrorView({ message, onRetry, onLogin }) {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="alert-circle-outline" size={56} color={colors.error} />
      <Text style={styles.title}>Algo deu errado</Text>
      <Text style={styles.message}>{message || 'Ocorreu um erro inesperado.'}</Text>

      <View style={styles.actions}>
        {onRetry ? (
          <TouchableOpacity style={styles.retryBtn} onPress={onRetry} activeOpacity={0.8}>
            <Text style={styles.retryText}>Tentar novamente</Text>
          </TouchableOpacity>
        ) : null}

        {onLogin ? (
          <TouchableOpacity style={styles.loginBtn} onPress={onLogin} activeOpacity={0.8}>
            <MaterialCommunityIcons name="logout" size={16} color={colors.primary} />
            <Text style={styles.loginText}>Voltar ao Login</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 32, backgroundColor: colors.background },
  title: { fontSize: 17, fontWeight: '700', color: colors.text, marginTop: 16, marginBottom: 6 },
  message: { fontSize: 14, color: colors.textWeak, textAlign: 'center', marginBottom: 24 },
  actions: { gap: 12, alignItems: 'center' },
  retryBtn: { backgroundColor: colors.primary, paddingHorizontal: 24, paddingVertical: 12, borderRadius: 10 },
  retryText: { color: colors.white, fontWeight: '700' },
  loginBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 10, borderWidth: 1, borderColor: colors.primary },
  loginText: { color: colors.primary, fontSize: 14, fontWeight: '700' },
});
