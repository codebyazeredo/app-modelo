import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { getScreenTitle } from '../navigation/screenTitles';

export default function AppHeader({ title, onBack, onLogout, loggingOut, rightAction }) {
  // Se a tela não passar `title`, resolve automaticamente pelo nome da rota
  // (ver core/navigation/screenTitles.js) — evita repetir o título manualmente
  // em toda tela nova.
  const route = useRoute();
  const resolvedTitle = title ?? getScreenTitle(route.name);

  return (
    <View style={styles.header}>
      <View style={styles.leftSlot}>
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.iconBtn} activeOpacity={0.7}>
            <MaterialCommunityIcons name="chevron-left" size={30} color={colors.white} />
          </TouchableOpacity>
        ) : null}
      </View>

      <Text style={styles.title} numberOfLines={1}>{resolvedTitle}</Text>

      <View style={styles.rightSlot}>
        {rightAction ?? null}
        {onLogout ? (
          <TouchableOpacity
            onPress={onLogout}
            style={styles.iconBtn}
            disabled={loggingOut}
            activeOpacity={0.7}
          >
            {loggingOut
              ? <ActivityIndicator size="small" color={colors.white} />
              : <MaterialCommunityIcons name="logout" size={20} color={colors.white} />
            }
          </TouchableOpacity>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
    paddingTop: 8,
    paddingBottom: 16,
  },
  leftSlot: { width: 40, alignItems: 'flex-start' },
  rightSlot: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  iconBtn: { width: 40, height: 40, justifyContent: 'center', alignItems: 'center' },
  title: { flex: 1, textAlign: 'center', color: colors.white, fontSize: 17, fontWeight: '700' },
});
