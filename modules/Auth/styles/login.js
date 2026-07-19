import { StyleSheet } from 'react-native';
import { colors } from '@core/theme/colors';

export default StyleSheet.create({
  flex: { flex: 1 },
  safeArea: { flex: 1, backgroundColor: colors.primary },
  scrollContent: { flexGrow: 1, justifyContent: 'center', padding: 24 },
  logo: { width: 96, height: 96, alignSelf: 'center', marginBottom: 16 },
  welcome: { fontSize: 22, fontWeight: '700', color: colors.white, textAlign: 'center' },
  welcomeSub: { fontSize: 14, color: 'rgba(255,255,255,0.8)', textAlign: 'center', marginBottom: 24 },
  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 20,
    padding: 24,
  },
  fieldGroup: { marginBottom: 16 },
  fieldLabel: { fontSize: 13, fontWeight: '600', color: colors.text, marginBottom: 6 },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.inputBorder,
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  inputWrapError: { borderColor: colors.error },
  inputIcon: { marginRight: 8 },
  input: { flex: 1, paddingVertical: 12, fontSize: 15, color: colors.text },
  eyeBtn: { padding: 6 },
  errorBox: { flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 16 },
  errorText: { color: colors.error, fontSize: 13, flexShrink: 1 },
  btnEntrar: { backgroundColor: colors.primary, borderRadius: 12, paddingVertical: 15, alignItems: 'center' },
  btnEntrarDisabled: { opacity: 0.7 },
  btnEntrarInner: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  btnEntrarText: { color: colors.white, fontSize: 16, fontWeight: '700' },
  linkBtn: { marginTop: 16, alignItems: 'center' },
  linkText: { color: colors.white, fontSize: 13, textDecorationLine: 'underline' },
});
