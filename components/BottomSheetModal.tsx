import {
  BottomSheetModal,
  type BottomSheetModalProps,
  BottomSheetScrollView,
} from '@gorhom/bottom-sheet';
// biome-ignore lint/style/useImportType: <explanation>
import React, { forwardRef } from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CustomBottomSheetModalBackdrop } from './CustomBottomSheetModalBackdrop';

const BackgroundComponent = () => <View className="bg-background-surface rounded-t-3xl" />;

type BaseBottomSheetModalProps = Omit<BottomSheetModalProps, 'children'> & {
  children: React.ReactNode;
};

export const BaseBottomSheetModal = forwardRef(
  (
    {
      children,
      hideHandle,
      disableOverlayTap,
      ...props
    }: BaseBottomSheetModalProps & {
      hideHandle?: boolean;
      disableOverlayTap?: boolean;
    },
    ref: React.ForwardedRef<BottomSheetModal>
  ) => {
    const { bottom } = useSafeAreaInsets();
    return (
      <BottomSheetModal
        backgroundComponent={BackgroundComponent}
        backdropComponent={(props) => (
          <CustomBottomSheetModalBackdrop {...props} disableOverlayTap={disableOverlayTap} />
        )}
        ref={ref}
        enablePanDownToClose
        enableDynamicSizing
        keyboardBlurBehavior="restore"
        {...props}>
        <BottomSheetScrollView alwaysBounceVertical={false} keyboardShouldPersistTaps="handled">
          <View className="flex-1 border-x bg-blue-400  px-2" style={{ paddingBottom: bottom }}>
            {children}
          </View>
        </BottomSheetScrollView>
      </BottomSheetModal>
    );
  }
);

BaseBottomSheetModal.displayName = 'BaseBottomSheetModal';
