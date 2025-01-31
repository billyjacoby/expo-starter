import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <View className="flex-1 bg-blue-500">
      <SafeAreaView className="flex-1 bg-blue-500">
        <Text>INDEX</Text>
      </SafeAreaView>
    </View>
  );
}
