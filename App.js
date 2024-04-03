import React, { useState, useEffect, useCallback } from 'react';
import { View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/AuthContext'; 
import { PaperProvider } from 'react-native-paper';
import AppInner from './components/AppInner' // Ensure AppInner is imported correctly

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  const queryClient = new QueryClient();

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          'SuperFunky': require('./assets/fonts/SuperFunky.ttf'),
        });
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return <AppLoading />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <PaperProvider>
          <AppInner />
        </PaperProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
