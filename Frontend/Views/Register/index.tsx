import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleRegister = () => {
    if (!firstName || !email || !password || !confirmPassword) {
      Alert.alert('Błąd', 'Proszę wypełnić wszystkie pola.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Błąd', 'Hasła muszą się zgadzać.');
      return;
    }
    // Tu należy dodać logikę rejestracji (np. API).
    Alert.alert('Rejestracja', `Witaj, ${firstName}!`);
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      {/* Nagłówek */}
      <Text style={styles.header}>Zarejestruj się</Text>

      {/* Imię */}
      <TextInput style={styles.input} placeholder='Imię' placeholderTextColor='#B0A8B9' value={firstName} onChangeText={setFirstName} />

      {/* E-mail */}
      <TextInput
        style={styles.input}
        placeholder='E-mail'
        placeholderTextColor='#B0A8B9'
        value={email}
        onChangeText={setEmail}
        keyboardType='email-address'
      />

      {/* Hasło */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder='Hasło'
          placeholderTextColor='#B0A8B9'
          secureTextEntry={!isPasswordVisible}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={handlePasswordVisibility} style={styles.eyeIcon}>
          <Ionicons name={isPasswordVisible ? 'eye-off' : 'eye'} size={20} color='#B0A8B9' />
        </TouchableOpacity>
      </View>

      {/* Potwierdzenie hasła */}
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder='Potwierdź hasło'
          placeholderTextColor='#B0A8B9'
          secureTextEntry={!isPasswordVisible}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
      </View>

      {/* Przycisk rejestracji */}
      <TouchableOpacity onPress={handleRegister} style={styles.registerButton}>
        <Text style={styles.registerButtonText}>Zarejestruj się</Text>
      </TouchableOpacity>

      {/* Link do logowania */}
      <View style={styles.linksContainer}>
        <Text style={styles.linkText}>Masz już konto? </Text>
        <TouchableOpacity>
          <Text style={[styles.linkText, styles.boldLinkText]}>Zaloguj się</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F1F6',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
    textAlign: 'center',
    color: '#6C4A5B',
  },
  input: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#6C4A5B',
    borderWidth: 1,
    borderColor: '#E0D1D6',
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  registerButton: {
    backgroundColor: '#D18E9D',
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
  linksContainer: {
    alignItems: 'center',
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  linkText: {
    color: '#6C4A5B',
    fontSize: 14,
  },
  boldLinkText: {
    fontWeight: 'bold',
    color: '#D18E9D',
  },
});

export default RegisterScreen;
