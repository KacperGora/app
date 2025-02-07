import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';

import { Dimensions, Keyboard, StyleSheet, View } from 'react-native';

import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import KeyboardAvoidingContainer from 'components/KeyboardAvoidingContainer';
import { use } from 'i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
        snapPoints={['12%', '50%', '85%']}
        onChange={handleChange}
        enablePanDownToClose
        enableHandlePanningGesture
        index={-1}
        backdropComponent={({ animatedIndex, style }) =>
          toggleForm && <View style={[style, backdropStyle.backdrop]} />
        }
      >
        <BottomSheetView style={styles.sheetContent}>
          <KeyboardAvoidingContainer>{children}</KeyboardAvoidingContainer>
        </BottomSheetView>
      </BottomSheet>
    );
  },
);

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
