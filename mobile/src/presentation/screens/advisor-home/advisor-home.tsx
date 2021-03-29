import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { useNavigation } from '@react-navigation/core'

import { Header, ScreenWrapper } from '@/presentation/components'
import { TouchableOpacity } from 'react-native-gesture-handler'

const AdvisorHome = (): JSX.Element => {
  const navigator = useNavigation()

  const handleNavigateToTeacherManagement = (): void => {
    navigator.navigate('AdvisorTeacherManagement')
  }

  const handleNavigateToStudentManagement = (): void => {
    console.log('Navigating to AdvisorStudentManagement')
  }

  const handleNavigateToDisciplineManagement = (): void => {
    console.log('Navigating to AdvisorDisciplineManagement')
  }

  const handleNavigateToOfferManagement = (): void => {
    console.log('Navigating to AdvisorOfferManagement')
  }

  return (
    <ScreenWrapper>
      <Header />
      <View style={styles.container}>
        <TouchableOpacity style={styles.navigationButton} onPress={handleNavigateToTeacherManagement}>
          <Text style={styles.navigationButtonText}>Gerenciar Professores</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navigationButton} onPress={handleNavigateToStudentManagement}>
          <Text style={styles.navigationButtonText}>Gerenciar Alunos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navigationButton} onPress={handleNavigateToDisciplineManagement}>
          <Text style={styles.navigationButtonText}>Gerenciar Disciplinas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navigationButton} onPress={handleNavigateToOfferManagement}>
          <Text style={styles.navigationButtonText}>Gerenciar Ofertas</Text>
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  )
}

export default AdvisorHome

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },

  navigationButton: {
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, .26)',
    borderRadius: 8,
    borderWidth: 1,
    height: 60,
    justifyContent: 'center',
    marginTop: 16,
    width: 260
  },

  navigationButtonText: {
    color: '#000',
    fontFamily: 'Roboto_700Bold',
    fontSize: 16
  }
})
