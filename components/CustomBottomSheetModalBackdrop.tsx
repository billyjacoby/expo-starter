import { BottomSheetBackdrop } from '@gorhom/bottom-sheet';
import React from 'react';
import type { SharedValue } from 'react-native-reanimated';

export const CustomBottomSheetModalBackdrop = ({
  animatedIndex,
  style,
  animatedPosition,
  disableOverlayTap,
}: {
  animatedIndex: SharedValue<number>;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  style?: any;
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  animatedPosition: any;
  disableOverlayTap?: boolean;
}) => {
  const containerStyle = React.useMemo(
    () => [
      style,
      {
        backgroundColor: 'black',
      },
    ],
    [style]
  );

  return (
    <BottomSheetBackdrop
      animatedPosition={animatedPosition}
      animatedIndex={animatedIndex}
      style={containerStyle}
      disappearsOnIndex={-1}
      opacity={1}
      pressBehavior={disableOverlayTap ? 'none' : undefined}
    />
  );
};
