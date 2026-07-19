import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@core/ui/AppHeader';
import { useAuth } from '@core/auth/AuthContext';
import styles from '../styles/perfil';

export default function PerfilScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <AppHeader title="Perfil" />
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.fieldLabel}>Nome</Text>
          <Text style={styles.fieldValue}>{user?.nome ?? '—'}</Text>

          <Text style={styles.fieldLabel}>E-mail</Text>
          <Text style={styles.fieldValue}>{user?.email ?? '—'}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
