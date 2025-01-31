import { useState } from 'react';
import { RefreshControl, ScrollView, Text, View } from 'react-native';

export default function NotificationsScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 3000);
  };
  return (
    <View>
      <ScrollView
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />}>
        <Text>Notifications</Text>
        {new Array(100).fill(0).map((_, index) => (
          <Text key={index}>Notification {index}</Text>
        ))}
      </ScrollView>
    </View>
  );
}
