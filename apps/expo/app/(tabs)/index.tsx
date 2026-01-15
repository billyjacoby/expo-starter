import { useMemo } from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

import { BaseScreen } from '~/components/base/BaseScreen';
import { useApiData } from '~/hooks/query/useApiData';

export default function TabsHome() {
  const { data, isLoading, error } = useApiData();

  const content = useMemo(() => {
    if (isLoading) {
      return <ActivityIndicator size="large" color="primary" />;
    }

    if (error) {
      return <Text>Error: {error.message}</Text>;
    }

    if (!data) {
      return <Text>No data</Text>;
    }

    return (
      <View>
        <Text>Home: {data.results.length} results</Text>
        {data.results.map((result: { name: string }) => (
          <Text key={result.name}>{result.name}</Text>
        ))}
      </View>
    );
  }, [data, isLoading, error]);

  return <BaseScreen>{content}</BaseScreen>;
}
