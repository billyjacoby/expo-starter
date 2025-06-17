import { Text } from 'react-native';

import { BaseScreenNoScroll } from '~/src/components/BaseScreen';

export default function HomeScreen() {
  console.log('HomeScreen');
  return (
    <BaseScreenNoScroll>
      <Text className="text-center font-fira-regular text-4xl text-red-500">INDEX</Text>
    </BaseScreenNoScroll>
  );
}
