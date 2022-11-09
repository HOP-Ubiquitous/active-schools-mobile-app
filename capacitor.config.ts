import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.activeschools.app',
  appName: 'Active Schools',
  webDir: 'www',
  bundledWebRuntime: false,
  cordova: {
    preferences: {
      YouTubeDataApiKey: 'AIzaSyDCuEZTwfjX48AQraSNUAji1h7hPeSbFMA',
      UseLegacySwiftLanguageVersion: 'true',
      ScrollEnabled: 'false',
      BackupWebStorage: 'none',
      SplashMaintainAspectRatio: 'true',
      FadeSplashScreenDuration: '300',
      SplashShowOnlyFirstTime: 'false',
      SplashScreen: 'screen',
      SplashScreenDelay: '3000'
    }
  }
};

export default config;
