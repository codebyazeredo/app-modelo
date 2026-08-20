import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ScrollView, ActivityIndicator, Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { colors } from '@core/theme/colors';
import { useAuth } from '@core/auth/AuthContext';
import { apiTrocarSenha } from '@core/auth/authApi';
import AppHeader from '@core/ui/AppHeader';
import Footer from '@core/ui/Footer';
import styles from '../styles/trocarSenha';

function CampoSenha({ label, value, onChangeText, mostrar, onToggleMostrar, placeholder }) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.inputWrap}>
        <TextInput
          style={styles.inputField}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textWeak}
          secureTextEntry={!mostrar}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity onPress={onToggleMostrar} style={styles.eyeBtn} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <MaterialCommunityIcons name={mostrar ? 'eye-off-outline' : 'eye-outline'} size={20} color={colors.textWeak} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function TrocarSenhaScreen({ navigation }) {
  const { token } = useAuth();

  const [senhaAtual, setSenhaAtual] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmacao, setConfirmacao] = useState('');
  const [mostrarSenhas, setMostrarSenhas] = useState(false);
  const [erro, setErro] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function handleSalvar() {
    setErro('');

    if (!senhaAtual.trim()) { setErro('Informe sua senha atual.'); return; }
    if (senha.length < 8) { setErro('A nova senha deve ter pelo menos 8 caracteres.'); return; }
    if (confirmacao !== senha) { setErro('A confirmação não corresponde à nova senha.'); return; }

    setSalvando(true);
    try {
      await apiTrocarSenha(token, {
        senha_atual: senhaAtual,
        senha,
        confirmacao,
      });
      setSenhaAtual('');
      setSenha('');
      setConfirmacao('');
      Alert.alert('Sucesso', 'Sua senha foi atualizada com sucesso!', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
    } catch (err) {
      setErro(err.message || 'Não foi possível atualizar a senha.');
    } finally {
      setSalvando(false);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['top']}>
      <AppHeader onBack={() => navigation.goBack()} />

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <MaterialCommunityIcons name="lock-outline" size={20} color={colors.primary} />
            <Text style={styles.cardTitle}>Alterar Senha</Text>
          </View>
          <Text style={styles.paragraph}>
            Informe sua senha atual e escolha uma nova senha de acesso ao aplicativo.
          </Text>

          <CampoSenha
            label="Senha atual"
            value={senhaAtual}
            onChangeText={setSenhaAtual}
            mostrar={mostrarSenhas}
            onToggleMostrar={() => setMostrarSenhas((v) => !v)}
            placeholder="Digite sua senha atual"
          />

          <CampoSenha
            label="Nova senha"
            value={senha}
            onChangeText={setSenha}
            mostrar={mostrarSenhas}
            onToggleMostrar={() => setMostrarSenhas((v) => !v)}
            placeholder="Mínimo 8 caracteres"
          />

          <CampoSenha
            label="Repita a nova senha"
            value={confirmacao}
            onChangeText={setConfirmacao}
            mostrar={mostrarSenhas}
            onToggleMostrar={() => setMostrarSenhas((v) => !v)}
            placeholder="Digite a nova senha novamente"
          />

          <View style={styles.dicaBox}>
            <MaterialCommunityIcons name="information-outline" size={16} color={colors.primary} />
            <Text style={styles.dicaTxt}>Use uma senha com pelo menos 8 caracteres, evitando dados pessoais óbvios.</Text>
          </View>

          {erro ? <Text style={styles.errorText}>{erro}</Text> : null}

          <TouchableOpacity style={styles.btnSalvar} onPress={handleSalvar} disabled={salvando} activeOpacity={0.85}>
            {salvando
              ? <ActivityIndicator color="#fff" />
              : <Text style={styles.btnSalvarTxt}>Salvar Nova Senha</Text>
            }
          </TouchableOpacity>
        </View>
      </ScrollView>

      <Footer />
    </SafeAreaView>
  );
}
