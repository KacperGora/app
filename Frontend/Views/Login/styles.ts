import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flex: 1,
    position: 'relative',
    height: 80,
  },
  gradient: {
    flex: 0.95,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff9a9e',
    borderBottomLeftRadius: 100,
    borderBottomRightRadius: 100,
  },
  appName: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    width: '100%',
    textAlign: 'center',
    fontFamily: 'Lato-Regular',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    elevation: 1,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
  },
  tagline: {
    fontSize: 18,
    color: '#fff',
    marginTop: 10,
    fontWeight: '500',
    fontFamily: 'Lato-B',
  },
  form: {
    paddingHorizontal: 20,
    paddingTop: 40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: '#fff',
    height: '60%',
  },
  input: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  button: {
    marginTop: 10,
    borderRadius: 8,
  },
  signupButton: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
})
