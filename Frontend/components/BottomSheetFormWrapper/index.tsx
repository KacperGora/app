import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { Dimensions, Keyboard, StyleSheet, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScrollView } from 'react-native-gesture-handler';

type BottomSheetFormWrapperProps = {
  children: React.ReactNode;
};

const BottomSheetFormWrapper = forwardRef<BottomSheet, BottomSheetFormWrapperProps>(({ children }, ref) => {
  const [toggleForm, setToggleForm] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const handleChange = (index: number) => {
    console.log('index', index);
    Keyboard.dismiss();
    setToggleForm(index !== -1);
  };

  useImperativeHandle(ref, () => ({
    expand: () => bottomSheetRef.current?.expand(),
    close: () => bottomSheetRef.current?.close(),
    collapse: () => bottomSheetRef.current?.collapse(),
    snapToIndex: (index: number) => bottomSheetRef.current?.snapToIndex(index),
    snapToPosition: (position: number | string) => bottomSheetRef.current?.snapToPosition(position),
    forceClose: () => bottomSheetRef.current?.forceClose(),
  }));

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={2}
      snapPoints={['12%', '50%', '90%']}
      onChange={handleChange}
      enablePanDownToClose
      enableHandlePanningGesture
      enableOverDrag
      backdropComponent={({ animatedIndex, style }) => toggleForm && <View style={[style, backdropStyle.backdrop]} />}
    >
      <BottomSheetView style={styles.sheetContent}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
          canCancelContentTouches
          keyboardDismissMode='interactive'
        >
          <ScrollView style={{ flex: 1, height: 'auto' }}>{children}</ScrollView>
        </KeyboardAwareScrollView>
      </BottomSheetView>
    </BottomSheet>
  );
});

export default BottomSheetFormWrapper;

export const backdropStyle = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

const styles = StyleSheet.create({
  sheetContent: {
    paddingHorizontal: 16,
    paddingVertical: 0,
    height: Dimensions.get('window').height - 120,
  },
});
