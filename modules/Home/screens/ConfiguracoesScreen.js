import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@core/ui/AppHeader';
import { useAuth } from '@core/auth/AuthContext';
import { useOffline } from '@core/offline/OfflineContext';
import { apiLogout } from '@core/auth/authApi';
import styles from '../styles/configuracoes';

export default function ConfiguracoesScreen() {
  const { token, signOut } = useAuth();
  const { pendentes, syncing, sync } = useOffline();
  const [loggingOut, setLoggingOut] = useState(false);

  async function handleSync() {
    await sync(token);
  }

  async function handleLogout() {
    setLoggingOut(true);
    try {
      await apiLogout(token);
    } finally {
      await signOut();
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <AppHeader title="Configurações" />
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.sectionTitle}>Sincronização</Text>
        <View style={styles.card}>
          <View style={styles.row}>
            <View>
              <Text style={styles.rowText}>Itens pendentes</Text>
              <Text style={styles.rowSub}>Dados salvos offline aguardando envio.</Text>
            </View>
            <Text style={styles.rowText}>{pendentes}</Text>
          </View>
          <TouchableOpacity
            style={[styles.btnPrimary, syncing && styles.btnPrimaryDisabled]}
            onPress={handleSync}
            disabled={syncing}
            activeOpacity={0.85}
          >
            {syncing
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.btnPrimaryText}>Sincronizar agora</Text>
            }
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={handleLogout}
          disabled={loggingOut}
          activeOpacity={0.85}
        >
          {loggingOut
            ? <ActivityIndicator color="#fff" />
            : <Text style={styles.logoutBtnText}>Sair</Text>
          }
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
