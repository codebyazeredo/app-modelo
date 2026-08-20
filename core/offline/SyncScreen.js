import React, { useCallback } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useAuth } from '../auth/AuthContext';
import { useOffline } from './OfflineContext';
import { colors } from '../theme/colors';
import AppHeader from '../ui/AppHeader';
import Footer from '../ui/Footer';
import styles from '../styles/sync';

function quando(ts) {
  try {
    const d = new Date(ts);
    const p = (n) => String(n).padStart(2, '0');
    return `${p(d.getDate())}/${p(d.getMonth() + 1)}/${d.getFullYear()} ${p(d.getHours())}:${p(d.getMinutes())}`;
  } catch { return ''; }
}

// Tela que dá visibilidade/controle sobre a fila offline mantida por
// core/offline (outbox + syncManager): mostra pendências, permite forçar
// sincronização e descartar itens que falharam.
export default function SyncScreen({ navigation }) {
  const { token } = useAuth();
  const { itens, pendentes, syncing, refresh, sync, remover, limparErros } = useOffline();

  useFocusEffect(useCallback(() => { refresh(); }, [refresh]));

  const temErros = itens.some((i) => i.status === 'error');

  async function sincronizar() {
    const r = await sync(token);
    if (r.offline) {
      Alert.alert('Sem conexão', 'Não foi possível conectar ao servidor. Tente novamente quando estiver online.');
    } else if (r.enviados > 0 || r.comErro > 0) {
      const partes = [];
      if (r.enviados > 0) partes.push(`${r.enviados} enviado(s)`);
      if (r.comErro > 0) partes.push(`${r.comErro} com erro`);
      Alert.alert('Sincronização', partes.join(' · ') || 'Concluído.');
    } else {
      Alert.alert('Tudo certo', 'Não há nada pendente para sincronizar.');
    }
  }

  function confirmarRemover(item) {
    Alert.alert('Remover item', `Descartar "${item.label}" da fila? Esta ação não pode ser desfeita.`, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Descartar', style: 'destructive', onPress: () => remover(item.id) },
    ]);
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <AppHeader onBack={() => navigation.goBack()} />

      <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Sincronização</Text>

        <View style={styles.resumoCard}>
          <Text style={styles.resumoNum}>{pendentes}</Text>
          <View style={styles.resumoInfo}>
            <Text style={styles.resumoTitulo}>{pendentes === 1 ? 'Registro pendente' : 'Registros pendentes'}</Text>
            <Text style={styles.resumoSub}>Dados salvos no aparelho aguardando envio ao servidor.</Text>
          </View>
          <MaterialCommunityIcons name={pendentes > 0 ? 'cloud-upload-outline' : 'cloud-check-outline'} size={28} color={colors.primary} />
        </View>

        <TouchableOpacity style={styles.syncBtn} onPress={sincronizar} disabled={syncing} activeOpacity={0.85}>
          {syncing ? <ActivityIndicator color="#fff" /> : (
            <>
              <MaterialCommunityIcons name="sync" size={18} color="#fff" />
              <Text style={styles.syncBtnTxt}>Sincronizar agora</Text>
            </>
          )}
        </TouchableOpacity>

        {itens.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>Nada pendente</Text>
            <Text style={styles.emptyText}>Tudo que você registrou já foi enviado ao servidor.</Text>
          </View>
        ) : (
          itens.map((item) => {
            const erro = item.status === 'error';
            return (
              <View key={item.id} style={[styles.item, erro && styles.itemErro]}>
                <View style={styles.itemRow}>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemLabel} numberOfLines={2}>{item.label}</Text>
                    <Text style={styles.itemMeta}>{quando(item.createdAt)}</Text>
                  </View>
                  <View style={[styles.badge, erro ? styles.badgeErro : styles.badgePend]}>
                    <Text style={erro ? styles.badgeErroTxt : styles.badgePendTxt}>{erro ? 'Erro' : 'Pendente'}</Text>
                  </View>
                </View>
                {erro && item.error ? <Text style={styles.itemErroTxt}>{item.error}</Text> : null}
                {erro && (
                  <TouchableOpacity onPress={() => confirmarRemover(item)}>
                    <Text style={styles.removerTxt}>Descartar</Text>
                  </TouchableOpacity>
                )}
              </View>
            );
          })
        )}

        {temErros && (
          <TouchableOpacity onPress={limparErros}>
            <Text style={styles.limparErrosTxt}>Descartar todos com erro</Text>
          </TouchableOpacity>
        )}
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}
