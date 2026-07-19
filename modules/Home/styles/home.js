import { StyleSheet } from 'react-native';
import { safeArea, scrollArea, scrollContent, card, sectionTitle } from '@core/styles/common';
import { colors } from '@core/theme/colors';

export default StyleSheet.create({
  safeArea,
  scrollArea,
  scrollContent,
  card,
  sectionTitle,
  cardTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 6 },
  cardText: { fontSize: 14, color: colors.textWeak, lineHeight: 20 },
});
