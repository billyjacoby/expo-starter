import { SplashScreen, Stack, useRouter } from 'expo-router';
import React from 'react';
import { Linking } from 'react-native';
import { AppWithProviders } from '../components/AppWithProviders';
import { getInitialURL } from 'expo-router/build/link/linking';

export default function RootLayout() {
  const router = useRouter();

  const [initialRoute, setInitialRoute] = React.useState<string | null>(null);

	React.useEffect(() => {
		async function getInitialURL() {
			const url = await Linking.getInitialURL();

			if (url) {
				setInitialRoute(url);
				router.replace('/');
			}
				SplashScreen.hideAsync()

		}

		getInitialURL();
	}, []);
  

  return (
    <AppWithProviders>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="(home)"
        options={{
          animation: 'fade',
        }}
      />
      <Stack.Screen
        name="notifications"
        options={{
          presentation: 'modal',
          animation: 'slide_from_bottom',
        }}
      />
    </Stack>
    </AppWithProviders>
  );
}
