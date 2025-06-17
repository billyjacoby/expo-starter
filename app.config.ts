import type { ConfigContext, ExpoConfig } from 'expo/config';

export default (options: ConfigContext): ExpoConfig => ({
  ...options,
  name: 'expo-starter',
  slug: 'expo-starter',
  version: '1.0.0',
  scheme: 'expo-starter',
  newArchEnabled: false,
  splash: {
    image: './assets/splash.png',
		resizeMode: 'cover',
		backgroundColor: '#14151A',
	},
	experiments: {
		tsconfigPaths: true,
		typedRoutes: true,
	},
	plugins: [
		'expo-web-browser',
		[
			'expo-router',
			{
				asyncRoutes: true,
			},
		],
		[
			'expo-secure-store',
			{
				faceIDPermission:
					'Allow Helix Mobile to access your Face ID biometric data.',
			},
		],
		[
			'expo-local-authentication',
			{
				faceIDPermission:
					'Allow Helix Mobile to access your Face ID biometric data.',
			},
		],
    [
      'expo-font',
      {
        fonts: ['./node_modules/@expo-google-fonts/fira-code/FiraCode_400Regular.ttf'],
      },
    ],
		[
			'react-native-vision-camera',
			{
				cameraPermissionText:
					'Helix needs access to your camera to scan a QR code',
			},
		],
		['expo-build-properties', {}],
		['@bugsnag/plugin-expo-eas-sourcemaps'],
		[
			'react-native-share',
			{
				ios: ['twitter'],
				android: ['com.twitter.android'],
				enableBase64ShareAndroid: true,
			},
		],
	],
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  assetBundlePatterns: ['**/*'],
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.billyjacoby.starter',
  },
  android: {
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#ffffff',
    },
    package: 'com.billyjacoby.starter',
  },
});
