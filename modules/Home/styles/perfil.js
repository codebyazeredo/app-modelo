import { StyleSheet } from 'react-native';
import { safeArea, scrollArea, scrollContent, card, fieldLabel } from '@core/styles/common';
import { colors } from '@core/theme/colors';

export default StyleSheet.create({
  safeArea,
  scrollArea,
  scrollContent,
  card,
  fieldLabel,
  fieldValue: { fontSize: 15, color: colors.text, marginBottom: 14 },
});
