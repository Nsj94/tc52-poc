import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.demo.zebrascanner',
  appName: 'ZebraScannerPOC',
   webDir: 'dist/browser',        // ✅ FIX THIS LINE
};

export default config;
