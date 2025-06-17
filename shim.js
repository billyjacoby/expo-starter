/* eslint-disable @typescript-eslint/no-var-requires */
require('node-libs-expo/globals');
import 'react-native-get-random-values';


if (typeof TextDecoder === 'undefined') {
  global.TextDecoder = require('text-encoding').TextDecoder;
}
// if (typeof TextEncoder === 'undefined') {
//   global.TextEncoder = require('text-encoding').TextEncoder;
// }
import * as crypto from 'expo-crypto';

// implement window.getRandomValues(), for packages that rely on it
if (typeof window === 'object') {
  if (!window.crypto) {
    window.crypto = {};
  }
  if (!window.crypto.getRandomValues) {
    window.crypto.getRandomValues = async function getRandomValues(arr) {
      let orig = arr;
      if (arr.byteLength != arr.length) {
        // Get access to the underlying raw bytes
        arr = new Uint8Array(arr.buffer);
      }
      const bytes = await crypto.getRandomBytesAsync(arr.length);
      for (var i = 0; i < bytes.length; i++) {
        arr[i] = bytes[i];
      }

      return orig;
    };
  }
}
