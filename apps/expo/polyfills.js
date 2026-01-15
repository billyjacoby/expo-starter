// Polyfill navigator.userAgent for React Native
// LangChain's isJsDom function checks navigator.userAgent, which may be undefined in React Native
if (typeof navigator !== 'undefined' && !navigator.userAgent) {
  navigator.userAgent = 'ReactNative';
}
