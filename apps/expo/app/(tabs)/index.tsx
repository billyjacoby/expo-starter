import { useMemo } from 'react';
import { ActivityIndicator, Text } from 'react-native';

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

    return <Text>Home: {data.results.length} results</Text>;
  }, [data, isLoading, error]);

  return <BaseScreen>{content}</BaseScreen>;
}
