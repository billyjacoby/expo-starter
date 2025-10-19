import { useEffect } from 'react';
import { ActivityIndicator, Text } from 'react-native';

import { Stack, useRouter } from 'expo-router';

import { BaseScreen } from '~/components/base/BaseScreen';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace('/(tabs)');
    }, 2000);
  }, [router]);

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <BaseScreen className="items-center justify-center gap-2">
        <ActivityIndicator size="large" color="primary" />
        <Text>Fake loading...</Text>
      </BaseScreen>
    </>
  );
}
