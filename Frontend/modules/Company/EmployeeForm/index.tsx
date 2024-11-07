import React, { useState } from 'react'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { TextInput, Button, Text } from 'react-native-paper'
import { colors } from 'theme/theme'
import { useTranslation } from 'react-i18next'

const EmployeeForm = () => {
  const { t } = useTranslation()
  const [employeeForm, setEmployeeForm] = useState({
    name: '',
    phoneNumber: '',
    position: '',
    image: '',
  })
  const { name, phoneNumber, position, image } = employeeForm

  const handleInputChange = (key: string) => (value: string) => {
    setEmployeeForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
      legacy: true,
    })

    if (!result.canceled) {
      setEmployeeForm((prev) => ({ ...prev, image: result.assets[0].uri }))
    }
  }
  const handleImageCapture = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
      base64: true,
      legacy: true,
    })

    if (!result.canceled) {
      setEmployeeForm((prev) => ({ ...prev, image: result.assets[0].uri }))
    }
  }

  const handleSubmit = () => {
    // Handle form submission
    // console.log('Employee Data:', { name, phoneNumber, position, image })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{t('Employee Form')}</Text>
      <TextInput label='Name' value={name} onChangeText={handleInputChange('name')} mode='outlined' style={styles.input} />
      <TextInput
        label='Email'
        value={phoneNumber}
        onChangeText={handleInputChange('phoneNumber')}
        style={styles.input}
        mode='outlined'
        keyboardType='email-address'
      />
      <TextInput mode='outlined' label='Position' value={position} onChangeText={handleInputChange('position')} style={styles.input} />
      <TouchableOpacity onPress={handleImagePick} style={styles.imagePicker}>
        {image ? <Image source={{ uri: image }} style={styles.image} /> : <Text style={styles.imagePlaceholder}>Pick an image</Text>}
      </TouchableOpacity>
      <Button mode='contained' onPress={handleSubmit} style={styles.button}>
        Submit
      </Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
  },
  input: {
    marginBottom: 16,
    backgroundColor: colors.background,
    borderColor: colors.textPrimary,
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    marginBottom: 16,
    backgroundColor: colors.background,
    borderColor: colors.textPrimary,
    borderWidth: 1,
    borderRadius: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  imagePlaceholder: {
    color: colors.textPrimary,
  },
  button: {
    marginTop: 16,
    borderRadius: 4,
    backgroundColor: '#000',
  },
})

export default EmployeeForm
