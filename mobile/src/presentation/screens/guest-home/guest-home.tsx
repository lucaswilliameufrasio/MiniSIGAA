import React, { useEffect } from 'react'
import { StackActions, useNavigation } from '@react-navigation/core'
import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'

import { GuestHeader, ScreenWrapper } from '@/presentation/components'
import { useAuth } from '@/presentation/contexts/auth'

const GuestHome = (): JSX.Element => {
  const navigator = useNavigation()

  const handleNavigateToLogin = (): void => {
    navigator.navigate('Login')
  }

  const { user, loading } = useAuth()

  useEffect(() => {
    if (user?.role === 'advisor') {
      StackActions.replace('AdvisorHome')
    }

    if (user?.role === 'teacher') {
      StackActions.replace('TeacherHome')
    }

    if (user?.role === 'student') {
      StackActions.replace('StudentHome')
    }
  }, [])

  if (loading) {
    return (
      <ActivityIndicator />
    )
  }

  return (
    <ScreenWrapper>
      <GuestHeader />
      <View style={styles.guestContainer}>
        <Text style={styles.guestTitle}>Bem vindo!</Text>
        <TouchableOpacity
          style={styles.guestButton}
          onPress={handleNavigateToLogin}
        >
          <Text style={styles.guestButtonText}>Acessar o sistema</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  )
}

export default GuestHome

const styles = StyleSheet.create({
  guestButton: {
    alignItems: 'center',
    borderColor: '#000',
    borderRadius: 8,
    borderWidth: 1,
    height: 60,
    justifyContent: 'center',
    marginTop: 10,
    width: 260
  },

  guestButtonText: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 16
  },

  guestContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },

  guestTitle: {
    color: '#000',
    fontFamily: 'RedHatDisplay_900Black',
    fontSize: 24
  }
})
