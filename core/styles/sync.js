import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import * as c from './common';

export default StyleSheet.create({
  safeArea: { ...c.safeArea },
  scrollView: { ...c.scrollArea },
  scrollContent: { ...c.scrollContent },

  sectionTitle: { ...c.sectionTitle },
  emptyCard: { ...c.emptyWrap },
  emptyTitle: { ...c.emptyTitle },
  emptyText: { ...c.emptySubtext },

  resumoCard: { ...c.card, flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 12 },
  resumoNum: { fontSize: 26, fontWeight: '800', color: colors.primary, minWidth: 40, textAlign: 'center' },
  resumoInfo: { flex: 1 },
  resumoTitulo: { fontSize: 15, fontWeight: '700', color: colors.text },
  resumoSub: { fontSize: 12, color: colors.textWeak, marginTop: 2 },

  syncBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 14, marginBottom: 16 },
  syncBtnTxt: { fontSize: 15, fontWeight: '800', color: '#fff' },

  item: { ...c.card, marginBottom: 8, borderLeftWidth: 3, borderLeftColor: colors.primary },
  itemErro: { borderLeftColor: colors.error },
  itemRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  itemInfo: { flex: 1 },
  itemLabel: { fontSize: 14, fontWeight: '700', color: colors.text },
  itemMeta: { fontSize: 12, color: colors.textWeak, marginTop: 2 },
  itemErroTxt: { fontSize: 12, color: colors.error, marginTop: 4 },

  badge: { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3 },
  badgePend: { backgroundColor: colors.primaryLight },
  badgePendTxt: { fontSize: 11, fontWeight: '800', color: colors.primary },
  badgeErro: { backgroundColor: '#fde8e8' },
  badgeErroTxt: { fontSize: 11, fontWeight: '800', color: colors.error },

  removerTxt: { fontSize: 13, fontWeight: '700', color: colors.error, marginTop: 8 },
  limparErrosTxt: { fontSize: 13, fontWeight: '700', color: colors.textWeak, textAlign: 'center', marginTop: 8, marginBottom: 24 },
});
