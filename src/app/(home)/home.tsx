import { useRouter } from 'expo-router';
import { SafeAreaView, Text, View } from 'react-native';

import { Button } from '~/src/components/Button';

export default function Home() {
  const router = useRouter();

  const handleButtonPress = () => {
    router.navigate('/notifications');
  };
  return (
    <View className="flex-1">
      <SafeAreaView className="items-center">
        <Text className="text-2xl">HOME</Text>
        <Button onPress={handleButtonPress} title="Go to Notifications" />
      </SafeAreaView>
    </View>
  );
}
