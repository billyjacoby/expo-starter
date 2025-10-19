import { Stack } from 'expo-router';

import { useAppStore } from '~/store/app-data';

export default function SearchLayout() {
  const setTabSearchValue = useAppStore((state) => state.setTabSearchValue);

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Search',
          headerShown: false,
          headerSearchBarOptions: {
            placement: 'automatic',
            placeholder: 'Search',
            onChangeText: (value) => setTabSearchValue(value.nativeEvent.text),
          },
        }}
      />
    </Stack>
  );
}
