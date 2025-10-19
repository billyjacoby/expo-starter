import { Text } from 'react-native';

import { BaseScreen } from '~/components/base/BaseScreen';
import { useAppStore } from '~/store/app-data';

export default function SearchIndex() {
  const tabSearchValue = useAppStore((state) => state.tabSearchValue);

  return (
    <BaseScreen>
      <Text>Searching for: {tabSearchValue}</Text>
    </BaseScreen>
  );
}
