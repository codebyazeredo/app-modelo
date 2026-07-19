import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppHeader from '@core/ui/AppHeader';
import { useAuth } from '@core/auth/AuthContext';
import styles from '../styles/home';

// Tela de exemplo — este é o ponto de partida para a funcionalidade real do
// app. Substitua o conteúdo abaixo pelas telas/consultas do seu domínio.
export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <AppHeader title="Início" />
      <ScrollView style={styles.scrollArea} contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Olá, {user?.nome ?? 'usuário'}!</Text>
          <Text style={styles.cardText}>
            Esta é a tela inicial do esqueleto. Substitua este conteúdo pelas
            telas e regras de negócio do app que você está construindo.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
