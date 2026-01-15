import { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HumanMessage, AIMessage, type BaseMessage } from '@langchain/core/messages';
import { model } from '~/lib/langchain/model';

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isStreaming) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message to chat
    const newUserMessage: Message = { role: 'user', content: userMessage };
    setMessages((prev) => [...prev, newUserMessage]);

    // Add placeholder for assistant response
    setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);
    setIsStreaming(true);

    try {
      // Convert messages to LangChain format
      const langchainMessages: BaseMessage[] = [
        ...messages.map((msg) =>
          msg.role === 'user'
            ? new HumanMessage(msg.content)
            : new AIMessage(msg.content)
        ),
        new HumanMessage(userMessage),
      ];

      // Stream the response
      let fullResponse = '';
      const stream = await model.stream(langchainMessages);

      for await (const chunk of stream) {
        const content = chunk.content;
        if (typeof content === 'string') {
          fullResponse += content;
          // Update the last message (assistant's response) in real-time
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              role: 'assistant',
              content: fullResponse,
            };
            return updated;
          });
        }
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: 'assistant',
          content: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        };
        return updated;
      });
    } finally {
      setIsStreaming(false);
    }
  };

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
    >
      <View className="flex-1 p-6">
        <View className="mb-4">
          <Text className="text-xl font-bold mb-2">Chat with LLM</Text>
          <Text className="text-sm text-gray-600">
            Test streaming functionality with LangChain
          </Text>
        </View>

        <ScrollView
          ref={scrollViewRef}
          className="flex-1 mb-4"
          contentContainerStyle={{ paddingBottom: 16 }}
          keyboardShouldPersistTaps="handled"
        >
          {messages.length === 0 && (
            <View className="p-4 bg-gray-100 rounded-lg">
              <Text className="text-gray-600 text-center">
                Start a conversation! Type a message below.
              </Text>
            </View>
          )}
          {messages.map((message, index) => (
            <View
              key={index}
              className={`mb-3 ${
                message.role === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <View
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.role === 'user'
                    ? 'bg-indigo-500'
                    : 'bg-gray-200'
                }`}
              >
                <Text
                  className={
                    message.role === 'user' ? 'text-white' : 'text-gray-900'
                  }
                >
                  {message.content || (isStreaming && index === messages.length - 1 ? '...' : '')}
                </Text>
              </View>
            </View>
          ))}
          {isStreaming && (
            <View className="items-start mb-3">
              <View className="bg-gray-200 rounded-lg p-3">
                <ActivityIndicator size="small" color="#6366f1" />
              </View>
            </View>
          )}
        </ScrollView>

        <View
          className="flex-row gap-2"
          style={{ paddingBottom: insets.bottom }}
        >
          <TextInput
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 bg-white"
            placeholder="Type your message..."
            value={input}
            onChangeText={setInput}
            onSubmitEditing={handleSend}
            editable={!isStreaming}
            multiline
          />
          <TouchableOpacity
            onPress={handleSend}
            disabled={!input.trim() || isStreaming}
            className={`px-6 py-3 rounded-lg ${
              !input.trim() || isStreaming
                ? 'bg-gray-300'
                : 'bg-indigo-500'
            } justify-center`}
          >
            {isStreaming ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text className="text-white font-semibold">Send</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
