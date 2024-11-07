import React, { forwardRef, useImperativeHandle, useMemo, useRef, useState } from 'react'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { useTranslation } from 'react-i18next'
import { Keyboard, StyleSheet, View } from 'react-native'
import { handleChange } from '@views/Calendar/utils'

type BottomSheetFormWrapperProps = {
  children: React.ReactNode
}

const BottomSheetFormWrapper = forwardRef<BottomSheet, BottomSheetFormWrapperProps>(({ children }, ref) => {
  const [toggleForm, setToggleForm] = useState(false)

  const bottomSheetRef = useRef<BottomSheet>(null)
  const handleChange = (index: number) => {
    if (index === -1) {
      Keyboard.dismiss()
      setToggleForm(false)
    } else {
      setToggleForm(true)
    }
  }
  useImperativeHandle(ref, () => ({
    expand: () => bottomSheetRef.current?.expand(),
    close: () => bottomSheetRef.current?.close(),
    collapse: () => bottomSheetRef.current?.collapse(),
    snapToIndex: (index: number) => bottomSheetRef.current?.snapToIndex(index),
    snapToPosition: (position: number | string) => bottomSheetRef.current?.snapToPosition(position),
    forceClose: () => bottomSheetRef.current?.forceClose(),
  }))

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      style={{
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.0,
        elevation: 24,
      }}
      snapPoints={['12%', '50%', '90%']}
      onChange={handleChange}
      enablePanDownToClose
      enableHandlePanningGesture
      enableOverDrag
      backdropComponent={({ animatedIndex, style }) => toggleForm && <View style={[style, backdropStyle.backdrop]} />}
    >
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheet>
  )
})

export default BottomSheetFormWrapper

export const backdropStyle = StyleSheet.create({
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
})
