import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AppHeader from '@core/ui/AppHeader';
import { useAuth } from '@core/auth/AuthContext';
import { outboxEnqueue } from '@core/offline/outbox';
import { colors } from '@core/theme/colors';
import styles from '../styles/home';

// Tela de exemplo — este é o ponto de partida para a funcionalidade real do
// app. Substitua o conteúdo abaixo pelas telas/consultas do seu domínio.
export default function HomeScreen({ navigation }) {
  const { user } = useAuth();
  const [nota, setNota] = useState('');
  const [salvando, setSalvando] = useState(false);

  // Demonstra o padrão "salvar offline": em vez de chamar apiFetch direto,
  // enfileira no outbox — funciona com ou sem conexão, e o item aparece na
  // fila em Ajustes > Ver fila detalhada até ser sincronizado. Ver README >
  // Offline para o padrão completo (outbox + cache).
  async function handleSalvarOffline() {
    if (!nota.trim()) return;
    setSalvando(true);
    try {
      await outboxEnqueue({
        endpoint: '/notas',
        method: 'POST',
        body: { texto: nota.trim() },
        label: `Nota: ${nota.trim()}`,
      });
      setNota('');
      Alert.alert(
        'Salvo',
        'A nota foi salva no aparelho e entrou na fila de sincronização. Veja em Ajustes > Ver fila detalhada.',
      );
    } finally {
      setSalvando(false);
    }
  }

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

        <Text style={styles.sectionTitle}>Exemplo: salvar offline</Text>
        <View style={styles.card}>
          <Text style={styles.fieldLabel}>Nota rápida</Text>
          <TextInput
            style={styles.input}
            value={nota}
            onChangeText={setNota}
            placeholder="Escreva algo e salve, mesmo sem conexão"
            placeholderTextColor={colors.textWeak}
          />
          <TouchableOpacity
            style={[styles.btnPrimary, { marginTop: 12 }, (salvando || !nota.trim()) && styles.btnPrimaryDisabled]}
            onPress={handleSalvarOffline}
            disabled={salvando || !nota.trim()}
            activeOpacity={0.85}
          >
            <Text style={styles.btnPrimaryText}>Salvar offline</Text>
          </TouchableOpacity>
          <Text style={styles.hintText}>
            Usa `outboxEnqueue` (core/offline/outbox.js) — funciona sem rede e
            fica pendente até você sincronizar em Ajustes.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
