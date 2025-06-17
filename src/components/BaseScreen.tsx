import clsx from 'clsx';
import { View, type ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const BaseScreenNoScroll: React.FC<ViewProps> = (props) => {
  const { top } = useSafeAreaInsets();

  console.log('BaseScreenNoScroll');

  return (
    <View
      {...props}
      className={clsx('bg-background', 'flex-1', props.className)}
      style={[props.style, { paddingTop: top }]}
    />
  );
};
