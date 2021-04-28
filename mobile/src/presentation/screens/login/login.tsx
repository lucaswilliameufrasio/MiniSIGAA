import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, TextInput } from 'react-native'

import { GuestHeader, ScreenWrapper, Radio } from '@/presentation/components'
import { StackActions, useNavigation } from '@react-navigation/core'
import { useSnackBars } from '@/presentation/contexts/snack'
import { useAuth } from '@/presentation/contexts/auth'

const Login = (): JSX.Element => {
  const navigation = useNavigation()
  const [selectedOption, setSelectedOption] = useState<string>('')
  const [role, setRole] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const { addAlert } = useSnackBars()
  const { signIn } = useAuth()

  const handleNavigationOnSignIn = (): void => {
    if (role === 'advisor') {
      navigation.dispatch({
        ...StackActions.replace('AdvisorHome')
      })
    } else if (role === 'teacher') {
      navigation.dispatch({
        ...StackActions.replace('TeacherHome')
      })
    } else if (role === 'student') {
      navigation.dispatch({
        ...StackActions.replace('StudentHome')
      })
    }
  }

  const handleSignIn = async (): Promise<void> => {
    if (selectedOption === '') {
      addAlert('É necessário selecionar um dos níveis de permissão!')
      return
    }
    try {
      await signIn({ email, password, role })
      handleNavigationOnSignIn()
    } catch (error: any) {
      console.log(error)
      const statusCode = error.response.status
      if (statusCode === 401) {
        addAlert('Verifique suas credenciais e tente novamente.')
        return
      } else if (statusCode === 403) {
        addAlert('Você não possui esse nível de permissão.')
        return
      }
      addAlert('Ocorreu um erro inesperado.')
    }
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
            onChangeSelect={(option) => {
              setSelectedOption(option)
              switch (option) {
                case 'Aluno':
                  setRole('student')
                  break
                case 'Professor':
                  setRole('teacher')
                  break
                case 'Técnico':
                  setRole('advisor')
                  break
                default:
                  setRole('')
                  break
              }
            }}
          />
        </View>

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          keyboardType='email-address'
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
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
