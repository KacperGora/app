import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { Keyboard, StyleSheet, View } from 'react-native';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { beautyTheme } from '@theme';
import KeyboardAvoidingContainer from 'components/KeyboardAvoidingContainer';

type BottomSheetFormWrapperProps = {
  children: React.ReactNode;
};

const BottomSheetFormWrapper = forwardRef<BottomSheet, BottomSheetFormWrapperProps>(
  ({ children }, ref) => {
    const [toggleForm, setToggleForm] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);

    const handleChange = (index: number) => {
      Keyboard.dismiss();
      setToggleForm(index !== -1);
    };

    useImperativeHandle(ref, () => ({
      expand: () => bottomSheetRef.current?.expand(),
      close: () => bottomSheetRef.current?.close(),
      collapse: () => bottomSheetRef.current?.collapse(),
      snapToIndex: (index: number) => bottomSheetRef.current?.snapToIndex(index),
      snapToPosition: (position: number | string) =>
        bottomSheetRef.current?.snapToPosition(position),
      forceClose: () => bottomSheetRef.current?.forceClose(),
    }));

    return (
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['12%', '50%', '90%']}
        onChange={handleChange}
        enablePanDownToClose
        style={{ backgroundColor: 'transparent' }}
        enableHandlePanningGesture
        index={-1}
        backgroundStyle={{ backgroundColor: beautyTheme.colors.background }}
        backdropComponent={({ animatedIndex, style }) =>
          toggleForm && <View style={[style, backdropStyle.backdrop]} />
        }
      >
        <KeyboardAvoidingContainer>
          <BottomSheetView style={styles.sheetContent}>{children}</BottomSheetView>
        </KeyboardAvoidingContainer>
      </BottomSheet>
    );
  },
);

export default BottomSheetFormWrapper;

const styles = StyleSheet.create({
  sheetContent: {
    flexGrow: 1,
    paddingHorizontal: beautyTheme.spacing.xl,
    paddingVertical: 0,
    borderTopLeftRadius: beautyTheme.shape.borderRadius,
    borderTopRightRadius: beautyTheme.shape.borderRadius,
  },
});

export const backdropStyle = StyleSheet.create({
  backdrop: {
    backgroundColor: beautyTheme.colors.backdrop,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
