import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppHeader from '@core/ui/AppHeader';
import { useAuth } from '@core/auth/AuthContext';
import { colors } from '@core/theme/colors';
import styles from '../styles/home';

// Tela de exemplo — este é o ponto de partida para a funcionalidade real do
// app. Substitua o conteúdo abaixo pelas telas/consultas do seu domínio.
export default function HomeScreen({ navigation }) {
  const { user } = useAuth();

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <AppHeader
        title="Início"
        rightAction={(
          <TouchableOpacity
            onPress={() => navigation.navigate('Notificacoes')}
            style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}
            activeOpacity={0.7}
          >
            <MaterialCommunityIcons name="bell-outline" size={22} color={colors.white} />
          </TouchableOpacity>
        )}
      />
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
