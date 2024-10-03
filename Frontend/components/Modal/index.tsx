import React from 'react'
import { StyleSheet, View, Modal, Pressable, Text, Alert } from 'react-native'

interface ModalComponentProps {
  visible: boolean
  toggleModal: () => void
}

const ModalComponent: React.FC<ModalComponentProps> = ({ visible, toggleModal }) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType='slide'
        // transparent={true}
        visible={visible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.')
          toggleModal()
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable style={[styles.button, styles.buttonClose]} onPress={toggleModal}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  )
}

export default ModalComponent

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
})
