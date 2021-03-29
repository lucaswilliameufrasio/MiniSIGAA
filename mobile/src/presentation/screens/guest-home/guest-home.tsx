import React from 'react'
import { useNavigation } from '@react-navigation/core'
import { TouchableOpacity } from 'react-native-gesture-handler'

  const navigator = useNavigation()

  const handleNavigateToLogin = (): void => {
    navigator.navigate('Login')
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLeading}>MiniSIGAA</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.contentTitle}>Bem vindo!</Text>
        <TouchableOpacity style={styles.contentButton} onPress={handleNavigateToLogin}>
          <Text style={styles.contentButtonText}>Acessar o sistema</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    paddingTop: StatusBar.currentHeight
  },

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
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },

  headerLeading: {
    fontFamily: 'RedHatDisplay_900Black',
    fontSize: 16,
    marginLeft: 10
  }
})
