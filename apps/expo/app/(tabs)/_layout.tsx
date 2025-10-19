import { PlatformColor } from 'react-native';

import {
  Badge,
  Icon,
  Label,
  NativeTabs,
} from 'expo-router/unstable-native-tabs';

export default function TabLayout() {
  return (
    <NativeTabs
      minimizeBehavior="onScrollDown"
      iconColor={PlatformColor('systemBlueColor')}
      tintColor={PlatformColor('systemBlueColor')}
      //   labelStyle={{
      //     // For the text color
      //     color: DynamicColorIOS({
      //       dark: 'white',
      //       light: 'black',
      //     }),
      //   }}
      //   // For the selected icon color
      //   tintColor={DynamicColorIOS({
      //     dark: 'white',
      //     light: 'black',
      //   })}
    >
      <NativeTabs.Trigger name="index">
        <Label>Home</Label>
        <Icon sf="house.fill" drawable="custom_android_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="account">
        <Badge>9</Badge>
        <Label>Account</Label>
        <Icon sf="person.fill" drawable="custom_pins_drawable" />
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="settings" disableScrollToTop>
        <Icon sf="gear" drawable="custom_settings_drawable" />
        <Label>Settings</Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search" role="search">
        <Label>Search</Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
