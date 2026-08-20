import { StyleSheet } from 'react-native';
import { safeArea, scrollArea, scrollContent, card, sectionTitle, btnPrimary, btnPrimaryText, btnPrimaryDisabled } from '@core/styles/common';
import { colors } from '@core/theme/colors';

export default StyleSheet.create({
  safeArea,
  scrollArea,
  scrollContent,
  card,
  sectionTitle,
  btnPrimary,
  btnPrimaryText,
  btnPrimaryDisabled,
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  rowText: { fontSize: 14, color: colors.text },
  rowSub: { fontSize: 12, color: colors.textWeak, marginTop: 2 },
  linkText: { fontSize: 13, fontWeight: '700', color: colors.primary, textAlign: 'center', marginTop: 4 },
  logoutBtn: { backgroundColor: colors.error, borderRadius: 12, paddingVertical: 15, alignItems: 'center', marginTop: 8 },
  logoutBtnText: { color: colors.white, fontSize: 16, fontWeight: '700' },
});
