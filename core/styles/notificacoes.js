import { StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import * as c from './common';

export default StyleSheet.create({
  safeArea: { ...c.safeArea },
  scrollView: { ...c.scrollArea },
  scrollContent: { ...c.scrollContent },

  errorText: { ...c.errorText },
  sectionTitle: { ...c.sectionTitle },

  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  marcarTodasBtn: { paddingVertical: 4, paddingHorizontal: 8 },
  marcarTodasTxt: { fontSize: 12.5, fontWeight: '700', color: colors.primary },

  emptyCard: { ...c.emptyWrap },
  emptyIconWrap: { ...c.emptyIconWrap },
  emptyTitle: { ...c.emptyTitle },
  emptyText: { ...c.emptySubtext },

  card: { ...c.card, ...c.softShadow, flexDirection: 'row', gap: 12 },
  cardNaoLida: { borderLeftWidth: 3, borderLeftColor: colors.primary },
  cardIcon: { width: 38, height: 38, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  cardBody: { flex: 1 },
  cardTitulo: { fontSize: 14, fontWeight: '700', color: colors.text },
  cardMensagem: { fontSize: 13, color: colors.textWeak, marginTop: 2, lineHeight: 18 },
  cardData: { fontSize: 11, color: colors.textWeak, marginTop: 6 },
  dotNaoLida: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary, marginLeft: 8, marginTop: 4 },
});
