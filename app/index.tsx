import { type BottomSheetModal, BottomSheetTextInput } from '@gorhom/bottom-sheet';
import { Stack } from 'expo-router';
import { useRef, useState } from 'react';
import { Text, View, useWindowDimensions } from 'react-native';

import { BaseBottomSheetModal } from '~/components/BottomSheetModal';
import { Button } from '~/components/Button';
import { Container } from '~/components/Container';
import { ScreenContent } from '~/components/ScreenContent';

const ViewZero = ({ onPress }: { onPress: () => void }) => (
  <>
    <View style={{ height: 300 }}>
      <Text>This is some content</Text>
      <BottomSheetTextInput placeholder="Enter your name" />
    </View>
    <Button title="Show View One" onPress={onPress} />
  </>
);

const ViewOne = ({ onPress }: { onPress: () => void }) => (
  <>
    <View style={{ height: 200, backgroundColor: 'red' }}>
      <Text>View One</Text>
    </View>
    <Button title="Show View Zero" onPress={onPress} />
  </>
);

export default function Home() {
  const ref = useRef<BottomSheetModal>(null);
  const { height } = useWindowDimensions();

  const [contentView, setContentView] = useState<'zero' | 'one'>('zero');

  function handlePress() {
    console.log('🪵 | handlePress |  ref.current:', ref.current);
    ref.current?.present();
  }

  const renderContent = () => {
    if (contentView === 'zero') {
      return <ViewZero onPress={() => setContentView('one')} />;
    }
    return <ViewOne onPress={() => setContentView('zero')} />;
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <ScreenContent path="app/index.tsx" title="Home" />
        <Button title="Reset content" onPress={() => setContentView('zero')} />
        <Button title="Show sheet" onPress={handlePress} />
      </Container>
      <BaseBottomSheetModal ref={ref} maxDynamicContentSize={height * 0.7}>
        {renderContent()}
      </BaseBottomSheetModal>
    </>
  );
}
