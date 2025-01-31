import { Tabs } from 'expo-router';

export default function HomeLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          headerShadowVisible: false,
          headerShown: false,
          tabBarStyle: {
            borderTopColor: '#202431',
            height: 82,
            paddingTop: 12,
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          },
          tabBarShowLabel: false,
        }}>
        <Tabs.Screen name="home" options={{}} />
      </Tabs>
    </>
  );
}
