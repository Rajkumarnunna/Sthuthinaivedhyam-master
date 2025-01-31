import { useEffect } from 'react';
import { Text } from 'react-native';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { SplashScreen } from 'expo-router';
import { DisplaySettingsProvider } from '@/contexts/DisplaySettingsContext';
import { setupDailyNotifications } from '@/utils/notifications';
import { Colors } from '@/constants/Colors';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

// Initialize notifications
useEffect(() => {
  setupDailyNotifications();
}, []);

export default function RootLayout() {
  try {
    const [loaded, error] = useFonts({
      'SpaceMono': require('../assets/fonts/SpaceMono-Regular.ttf'),
      'Mallanna': require('../assets/fonts/Mallanna-Regular.ttf'),
      'Mandali': require('../assets/fonts/Mandali-Regular.ttf'),
      'Ramabhadra': require('../assets/fonts/Ramabhadra-Regular.ttf'),
    });

    // Expo Router uses Error Boundaries to catch errors in the navigation tree.
    useEffect(() => {
      if (error) {
        console.error('Font loading error:', error);
        throw error;
      }
    }, [error]);

    useEffect(() => {
      if (loaded) {
        try {
          SplashScreen.hideAsync();
        } catch (e) {
          console.error('Error hiding splash screen:', e);
        }
      }
    }, [loaded]);

    if (!loaded) {
      return <Text>Loading fonts...</Text>;
    }

    return (
      <DisplaySettingsProvider>
        <Stack
          screenOptions={{
            contentStyle: {
              backgroundColor: Colors.light.background, // Default light theme
            },
            headerStyle: {
              backgroundColor: Colors.light.background,
            },
            headerTintColor: Colors.light.text,
            animation: 'fade',
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </DisplaySettingsProvider>
    );
  } catch (e) {
    console.error('Root layout error:', e);
    return <Text>Error in root layout: {e.message}</Text>;
  }
}
