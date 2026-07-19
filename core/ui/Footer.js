import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';

// Rodapé neutro — troque o texto pela marca/versão do app real, se desejar.
export default function Footer() {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>App Modelo</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', paddingVertical: 10 },
  text: { fontSize: 11, color: colors.textWeak },
});
