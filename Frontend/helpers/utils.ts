import AsyncStorage from '@react-native-async-storage/async-storage'

export const checkTokenExpiration = async () => {
  // if (!token) return
  // const decodedToken = jwtDecode(token)
  // const currentTime = Date.now() / 1000
  // if (decodedToken.exp && decodedToken.exp < currentTime) {
  //   try {
  //     const response = await api.post('/auth/refresh-token')
  //     await saveToken('token', response.data.token)
  //   } catch (error) {}
  // }
}

export const toCamelCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => toCamelCase(v))
  } else if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase()), toCamelCase(value)]),
    )
  }
  return obj
}

export const toSnakeCase = (obj: any): any => {
  if (Array.isArray(obj)) {
    return obj.map((v) => toSnakeCase(v))
  } else if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`), toSnakeCase(value)]),
    )
  }
  return obj
}
