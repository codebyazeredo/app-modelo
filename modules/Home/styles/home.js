import { StyleSheet } from 'react-native';
import {
  safeArea, scrollArea, scrollContent, card, sectionTitle,
  fieldLabel, input, btnPrimary, btnPrimaryText, btnPrimaryDisabled,
} from '@core/styles/common';
import { colors } from '@core/theme/colors';

export default StyleSheet.create({
  safeArea,
  scrollArea,
  scrollContent,
  card,
  sectionTitle,
  fieldLabel,
  input,
  btnPrimary,
  btnPrimaryText,
  btnPrimaryDisabled,
  cardTitle: { fontSize: 16, fontWeight: '700', color: colors.text, marginBottom: 6 },
  cardText: { fontSize: 14, color: colors.textWeak, lineHeight: 20 },
  hintText: { fontSize: 12, color: colors.textWeak, marginTop: 8, lineHeight: 17 },
});
