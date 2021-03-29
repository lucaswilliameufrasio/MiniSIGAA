import React from 'react'
import { useNavigation } from '@react-navigation/core'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StyleSheet, Text, View } from 'react-native'

import { Header, ScreenWrapper } from '@/presentation/components'

const GuestHome = (): JSX.Element => {
  const navigator = useNavigation()

  const handleNavigateToLogin = (): void => {
    navigator.navigate('Login')
  }

  return (
    <ScreenWrapper>
      <Header />
      <View style={styles.content}>
        <Text style={styles.contentTitle}>Bem vindo!</Text>
        <TouchableOpacity
          style={styles.contentButton}
          onPress={handleNavigateToLogin}
        >
          <Text style={styles.contentButtonText}>Acessar o sistema</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  )
}

export default GuestHome

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },

  contentButton: {
    alignItems: 'center',
    borderColor: '#000',
    borderRadius: 8,
    borderWidth: 1,
    height: 60,
    justifyContent: 'center',
    marginTop: 10,
    width: 260
  },

  contentButtonText: {
    fontFamily: 'Roboto_700Bold',
    fontSize: 16
  },

  contentTitle: {
    color: '#000',
    fontFamily: 'RedHatDisplay_900Black',
    fontSize: 24
  }
})
