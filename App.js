import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider } from '@core/auth/AuthContext';
import { OfflineProvider } from '@core/offline/OfflineContext';
import RootNavigator from '@core/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <OfflineProvider>
          <StatusBar style="light" />
          <RootNavigator />
        </OfflineProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
