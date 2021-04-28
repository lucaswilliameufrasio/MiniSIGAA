import React, { createContext, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { api } from '@/services/api'

interface User {
  name: string
  role: string
}

interface AuthContextData {
  signed: boolean
  user: User | null
  loading: boolean
  signIn: (params: SignInParams) => Promise<void>
  signOut: () => void
}

type SignInParams = {
  email: string
  password: string
  role: string
}

type SignInResult = {
  data: {
    token: string
    name: string
    role: string
  }
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadStorageData (): Promise<void> {
      const storedUser: string | null = await AsyncStorage.getItem('Mini:user')
      const storedToken: string | null = await AsyncStorage.getItem(
        'Mini:token'
      )

      if (storedUser !== null && storedToken !== null) {
        api.defaults.headers.Authorization = `Bearer ${storedToken}`

        setUser(JSON.parse(storedUser))
      }
      setLoading(false)
    }

    loadStorageData()
  }, [])

  async function signIn ({
    email,
    password,
    role
  }: SignInParams): Promise<void> {
    console.log({ email, password, role })
    const response: SignInResult = await api.post(
      'login',
      { email, password },
      {
        params: {
          role
        }
      }
    )

    setUser({ name: response.data.name, role: response.data.role })

    api.defaults.headers.Authorization = `Bearer ${response.data.token}`

    await AsyncStorage.setItem(
      'Mini:user',
      JSON.stringify({ name: response.data.name, role: response.data.role })
    )
    await AsyncStorage.setItem(
      'Mini:token',
      JSON.stringify(response.data.token)
    )
  }

  function signOut (): void {
    AsyncStorage.clear().then(() => {
      setUser(null)
    })
    api.defaults.headers.Authorization = null
  }

  return (
    <AuthContext.Provider
      value={{ signed: !(user == null), loading, user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth (): AuthContextData {
  const context = useContext(AuthContext)

  return context
}
