import { Stack } from 'expo-router';
import '../../global.css';

export default function RootLayout() {
  return (
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
  );
}
