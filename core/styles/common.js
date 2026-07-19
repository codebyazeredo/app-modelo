import { colors } from '../theme/colors';

export const safeArea = {
  flex: 1,
  backgroundColor: colors.background,
};

export const softShadow = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 1,
};

export const screenHeader = {
  backgroundColor: colors.primary,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingHorizontal: 16,
  paddingTop: 8,
  paddingBottom: 16,
};

export const headerTitle = {
  color: colors.white,
  fontSize: 18,
  fontWeight: '700',
};

export const scrollArea = {
  flex: 1,
  backgroundColor: colors.background,
};

export const scrollContent = {
  padding: 16,
  paddingBottom: 24,
};

export const card = {
  backgroundColor: colors.cardBackground,
  borderRadius: 12,
  padding: 14,
  marginBottom: 10,
  borderWidth: 1,
  borderColor: colors.divider,
  shadowColor: '#212529',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.07,
  shadowRadius: 6,
  elevation: 2,
};

export const elevatedCard = {
  backgroundColor: colors.cardBackground,
  borderRadius: 20,
  padding: 24,
  borderWidth: 1,
  borderColor: colors.divider,
  shadowColor: '#212529',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.10,
  shadowRadius: 12,
  elevation: 4,
};

export const fieldLabel = {
  fontSize: 13,
  fontWeight: '600',
  color: colors.text,
  marginBottom: 6,
};

export const input = {
  borderWidth: 1,
  borderColor: colors.inputBorder,
  borderRadius: 10,
  paddingHorizontal: 14,
  paddingVertical: 12,
  fontSize: 15,
  color: colors.text,
  backgroundColor: colors.inputBackground,
};

export const btnPrimary = {
  backgroundColor: colors.primary,
  borderRadius: 12,
  paddingVertical: 15,
  alignItems: 'center',
};

export const btnPrimaryText = {
  color: colors.white,
  fontSize: 16,
  fontWeight: '700',
};

export const btnPrimaryDisabled = {
  opacity: 0.6,
};

export const sectionTitle = {
  fontSize: 13,
  fontWeight: '700',
  color: colors.textWeak,
  textTransform: 'uppercase',
  letterSpacing: 0.5,
  marginBottom: 10,
};

export const errorText = {
  color: colors.error,
  fontSize: 13,
  marginBottom: 12,
};

export const emptyWrap = {
  paddingVertical: 48,
  paddingHorizontal: 32,
  alignItems: 'center',
};

export const emptyIconWrap = {
  width: 72,
  height: 72,
  borderRadius: 36,
  backgroundColor: colors.primaryLight,
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 16,
};

export const emptyTitle = {
  fontSize: 16,
  fontWeight: '700',
  color: colors.text,
  marginBottom: 6,
  textAlign: 'center',
};

export const emptySubtext = {
  fontSize: 13,
  color: colors.textWeak,
  textAlign: 'center',
  lineHeight: 19,
};
