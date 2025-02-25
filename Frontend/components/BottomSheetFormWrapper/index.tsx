import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';

import { Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import BottomSheet, { BottomSheetScrollView, BottomSheetView } from '@gorhom/bottom-sheet';
import { beautyTheme } from '@theme';
import KeyboardAvoidingContainer from 'components/KeyboardAvoidingContainer';
import ScreenWrapper from 'components/ScreenWrapper';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

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
        containerStyle={styles.bottomSheetContainer}
        enablePanDownToClose
        enableHandlePanningGesture
        index={-1}
        style={{ flex: 1, flexGrow: 1 }}
      >
        <BottomSheetView style={styles.sheetContent}>{children}</BottomSheetView>
      </BottomSheet>
    );
  },
);

export default BottomSheetFormWrapper;

const styles = StyleSheet.create({
  sheetContent: {
    paddingHorizontal: beautyTheme.spacing.xl,
    paddingVertical: 0,
    flex: 1,
    flexGrow: 1,
    borderTopLeftRadius: beautyTheme.shape.borderRadius,
    borderTopRightRadius: beautyTheme.shape.borderRadius,
  },
  bottomSheetContainer: {
    flex: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
    padding: beautyTheme.spacing.xl,
    alignItems: 'center',
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
