import { StyleSheet } from 'react-native';
import { colors } from '@core/theme/colors';
import * as c from '@core/styles/common';

export default StyleSheet.create({
  safeArea: { ...c.safeArea },
  scrollView: { ...c.scrollArea },
  scrollContent: { ...c.scrollContent },
  errorText: { ...c.errorText },
  fieldLabel: { ...c.fieldLabel },

  card: { ...c.card, ...c.softShadow },
  cardHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 4 },
  cardTitle: { fontSize: 16, fontWeight: '800', color: colors.text, flex: 1 },
  paragraph: { fontSize: 13, color: colors.textWeak, lineHeight: 19, marginBottom: 14 },

  inputWrap: {
    ...c.input,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 0,
    paddingRight: 8,
  },
  inputField: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    paddingVertical: 12,
  },
  eyeBtn: { padding: 6 },

  dicaBox: {
    flexDirection: 'row',
    gap: 8,
    backgroundColor: colors.primaryLight,
    borderRadius: 10,
    padding: 12,
    marginTop: 4,
    marginBottom: 16,
  },
  dicaTxt: { flex: 1, fontSize: 12, color: colors.primary, lineHeight: 17 },

  btnSalvar: { ...c.btnPrimary, marginTop: 6 },
  btnSalvarTxt: { ...c.btnPrimaryText },
});
