import { useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';

import { Button } from '~/components/Button';
import { BaseScreen } from '~/components/base/BaseScreen';
import { useApiData } from '~/hooks/query/useApiData';
import { runAgent } from '~/lib/langchain/agent';

export default function TabsHome() {
  const { data, isLoading, error } = useApiData();
  const [agentLoading, setAgentLoading] = useState(false);
  const [agentResponse, setAgentResponse] = useState<{
    success: boolean;
    data?: unknown;
    error?: string;
  } | null>(null);

  const handleRunAgent = async () => {
    setAgentLoading(true);
    setAgentResponse(null);
    const result = await runAgent('what is the weather outside?');
    setAgentResponse(result);
    setAgentLoading(false);
  };

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

  return (
    <BaseScreen>
      <ScrollView className="flex-1">
        <View className="gap-4 p-4">
          <Button
            title={agentLoading ? 'Running Agent...' : 'Run LangChain Agent'}
            onPress={handleRunAgent}
            disabled={agentLoading}
          />
          {agentLoading && <ActivityIndicator size="small" color="primary" />}
          {agentResponse && (
            <View className="rounded-lg bg-gray-100 p-4">
              {agentResponse.success ? (
                <View>
                  <Text className="mb-2 font-semibold">Agent Response:</Text>
                  <Text className="text-sm">
                    {JSON.stringify(agentResponse.data, null, 2)}
                  </Text>
                </View>
              ) : (
                <View>
                  <Text className="mb-2 font-semibold text-red-600">
                    Error:
                  </Text>
                  <Text className="text-red-600 text-sm">
                    {agentResponse.error}
                  </Text>
                </View>
              )}
            </View>
          )}
          {content}
        </View>
      </ScrollView>
    </BaseScreen>
  );
}
