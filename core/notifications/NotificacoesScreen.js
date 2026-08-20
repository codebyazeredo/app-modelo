import React, { useState, useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { useAuth } from '../auth/AuthContext';
import AppHeader from '../ui/AppHeader';
import Footer from '../ui/Footer';
import {
  apiGetNotificacoes, apiMarcarNotificacaoLida, apiMarcarTodasNotificacoesLidas,
} from '../services/notificacoesApi';
import styles from '../styles/notificacoes';

// Ícone por `tipo` de notificação — adicione entradas conforme os tipos do
// seu backend (ex.: { 'Pedido aprovado': { icone: 'check-circle-outline', cor: colors.success } }).
// Tipos sem entrada aqui caem no ícone/cor padrão.
const TIPO_ICONES = {};
const ICONE_PADRAO = { icone: 'bell-outline', cor: colors.primary };

// Central de notificações in-app — histórico do que foi enviado por push
// (core/services/pushNotifications.js) mais qualquer notificação gerada só
// no backend, com marcação de lida/não lida.
export default function NotificacoesScreen({ navigation }) {
  const { token } = useAuth();
  const [notificacoes, setNotificacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const carregar = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const res = await apiGetNotificacoes(token);
      setNotificacoes(res.notificacoes ?? []);
    } catch (err) {
      setError(err.message || 'Não foi possível carregar as notificações.');
    } finally {
      setLoading(false);
    }
  }, [token]);

  useFocusEffect(useCallback(() => { carregar(); }, [carregar]));

  async function marcarLida(item) {
    if (item.lida) return;
    setNotificacoes((prev) => prev.map((n) => (n.id === item.id ? { ...n, lida: true } : n)));
    try {
      await apiMarcarNotificacaoLida(token, item.id);
    } catch (err) {
      // mantém marcado localmente; próxima carga sincroniza de novo se falhar no servidor
    }
  }

  async function marcarTodasLidas() {
    setNotificacoes((prev) => prev.map((n) => ({ ...n, lida: true })));
    try {
      await apiMarcarTodasNotificacoesLidas(token);
    } catch (err) {
      await carregar();
    }
  }

  const naoLidas = notificacoes.filter((n) => !n.lida).length;

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <AppHeader onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.headerRow}>
          <Text style={styles.sectionTitle}>
            Notificações{naoLidas > 0 ? ` (${naoLidas} não lida${naoLidas > 1 ? 's' : ''})` : ''}
          </Text>
          {naoLidas > 0 && (
            <TouchableOpacity style={styles.marcarTodasBtn} onPress={marcarTodasLidas} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
              <Text style={styles.marcarTodasTxt}>Marcar todas como lidas</Text>
            </TouchableOpacity>
          )}
        </View>

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        {loading ? (
          <ActivityIndicator color={colors.primary} style={{ marginTop: 32 }} />
        ) : notificacoes.length === 0 ? (
          <View style={styles.emptyCard}>
            <View style={styles.emptyIconWrap}>
              <MaterialCommunityIcons name="bell-outline" size={34} color={colors.primary} />
            </View>
            <Text style={styles.emptyTitle}>Nenhuma notificação</Text>
            <Text style={styles.emptyText}>Você será avisado aqui quando houver algo novo.</Text>
          </View>
        ) : (
          notificacoes.map((n) => {
            const { icone, cor } = TIPO_ICONES[n.tipo] ?? ICONE_PADRAO;
            return (
              <TouchableOpacity
                key={n.id}
                style={[styles.card, !n.lida && styles.cardNaoLida]}
                activeOpacity={0.8}
                onPress={() => marcarLida(n)}
              >
                <View style={[styles.cardIcon, { backgroundColor: cor }]}>
                  <MaterialCommunityIcons name={icone} size={20} color="#fff" />
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitulo} numberOfLines={2}>{n.titulo}</Text>
                  <Text style={styles.cardMensagem}>{n.mensagem}</Text>
                  <Text style={styles.cardData}>{n.data_criacao}</Text>
                </View>
                {!n.lida && <View style={styles.dotNaoLida} />}
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}
