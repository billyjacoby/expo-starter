import React, { type PropsWithChildren } from 'react';

import { useReactQueryDevTools } from '@dev-plugins/react-query';
import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { SplashScreen } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import ErrorBoundary from 'react-native-error-boundary';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { PortalHost } from '@rn-primitives/portal';

import {
  ActivityIndicator,
  ScrollView,
  type ScrollViewProps,
  View
} from 'react-native';

import FallbackComponent from 'react-native-error-boundary/lib/ErrorBoundary/FallbackComponent';
// import '../../global.css';
// import { AlertProvider } from './components/Alert/AlertProvider';
// import { BalanceInputAccessory } from './components/BalanceInputAccessory';
// import { TurnkeyWrapper } from './components/TurnkeyWrapper';
// import { Watchers } from './components/Watchers';
// import { useNotificationObserver } from './hooks/push-notifications/useNotificationObserver';
// import { onAppLoad } from './utils/app-load';
// import { colors } from './utils/colors';
// import { logger } from './utils/logger';
// import { toastConfig } from './utils/toast-messages';
import '../../global.css';

SplashScreen.preventAutoHideAsync();

// const BSErrorBoundary = Bugsnag.getPlugin('react').createErrorBoundary(React);

const scrollViewDefaultProps: ScrollViewProps = {
	alwaysBounceVertical: false,
	showsVerticalScrollIndicator: false,
};

// @ts-expect-error - set default props for all scrollviews
ScrollView.defaultProps = scrollViewDefaultProps;
// @ts-expect-error - set default props for all activity indicators
ActivityIndicator.defaultProps = {
	// color: colors.foreground,
};

export function AppWithProviders({ children }: PropsWithChildren) {
	// useNotificationObserver();

	const [queryClient] = React.useState(
		new QueryClient({
			queryCache: new QueryCache({
				onError: (error, query) => {
					if (__DEV__) {
						// logger.error(
						// 	error.message,
						// 	JSON.stringify({ error, query }, null, 1),
						// );
					} else {
						// logger.error(error.message, JSON.stringify({ error, query }));
					}
				},
			}),
			mutationCache: new MutationCache({
				onError: (error, variables, context) => {
					// logger.error(
					// 	error.message,
					// 	JSON.stringify({ error, variables, context }),
					// );
				},
			}),
		}),
	);
	useReactQueryDevTools(queryClient);

	React.useEffect(() => {
		// onAppLoad();
	}, []);

	return (
		// TODO: update error boundary for production
		<ErrorBoundary
			FallbackComponent={FallbackComponent}
			onError={(error) => {
				// logger.debugToast(error);
			}}
		>
			{/* <BSErrorBoundary> */}
				<GestureHandlerRootView>
					{/* <TurnkeyWrapper> */}
						<QueryClientProvider client={queryClient}>
							<View className="h-full bg-background">{children}</View>
							{/* <Watchers /> */}
							{/* <AlertProvider /> */}
							{/* <BalanceInputAccessory /> */}
						</QueryClientProvider>
						{/* <Toast topOffset={50} config={toastConfig} /> */}
						<PortalHost />
					{/* </TurnkeyWrapper> */}
				</GestureHandlerRootView>
				<StatusBar style="light" />
			{/* </BSErrorBoundary> */}
		</ErrorBoundary>
	);
}
