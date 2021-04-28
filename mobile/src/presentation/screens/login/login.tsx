import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { GuestHeader, ScreenWrapper, Radio } from '@/presentation/components'
import { StackActions, useNavigation } from '@react-navigation/core'
import { useSnackBars } from '@/presentation/contexts/snack'

const Login = (): JSX.Element => {
  const navigation = useNavigation()
  const [selectedOption, setSelectedOption] = useState<string>('')
  const { addAlert } = useSnackBars()

  const handleSignIn = (): void => {
    if (selectedOption === 'Técnico') {
      navigation.dispatch({
        ...StackActions.replace('AdvisorHome')
      })
    } else if (selectedOption === 'Professor') {
      navigation.dispatch({
        ...StackActions.replace('TeacherHome')
      })
    } else if (selectedOption === 'Aluno') {
      navigation.dispatch({
        ...StackActions.replace('StudentHome')
      })
    }
    addAlert('É necessário selecionar um dos níveis de permissão!')
  }

  return (
    <ScreenWrapper>
      <GuestHeader />
      <View style={styles.loginContainer}>
        <View
          style={{
            paddingBottom: 24,
            flexDirection: 'row',
            justifyContent: 'center'
          }}
        >
          <Radio
          options={['Aluno', 'Professor', 'Técnico']}
          horizontal={true}
          selectedOption={selectedOption}
          onChangeSelect={(option) => setSelectedOption(option)}
          />
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          keyboardType='email-address'
          onChangeText={() => {}}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={() => {}}
        />

        <View style={styles.loginButtonContainer}>
          <TouchableOpacity style={styles.loginButton} onPress={handleSignIn}>
            <Text style={styles.loginButtonText}>Acessar o sistema</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  )
}

export default Login

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#F5F8FA',
    borderColor: '#D3E2E5',
    borderRadius: 20,
    borderWidth: 1.4,
    height: 56,
    marginBottom: 16,
    paddingHorizontal: 24,
    paddingVertical: 18,
    textAlignVertical: 'top'
  },

  label: {
    color: '#000',
    fontFamily: 'RedHatDisplay_700Bold',
    marginBottom: 8
  },

  loginButton: {
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, .26)',
    borderRadius: 8,
    borderWidth: 1,
    height: 60,
    justifyContent: 'center',
    marginTop: 10,
    width: 260
  },

  loginButtonContainer: {
    alignItems: 'center'
  },

  loginButtonText: {
    color: '#000',
    fontFamily: 'Roboto_700Bold',
    fontSize: 16
  },

  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24
  }
})
