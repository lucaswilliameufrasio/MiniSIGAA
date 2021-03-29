import React, { useState } from 'react'
import { TextInput } from 'react-native-gesture-handler'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { GuestHeader, ScreenWrapper, CheckBox } from '@/presentation/components'

const Login = (): JSX.Element => {
  const [toggleCheckBoxStudent, setToggleCheckBoxStudent] = useState(false)
  const [toggleCheckBoxTeacher, setToggleCheckBoxTeacher] = useState(false)
  const [toggleCheckBoxAdvisor, setToggleCheckBoxAdvisor] = useState(false)

  const handleStudentCheckBox = (value: boolean): void => {
    setToggleCheckBoxStudent(value)
    setToggleCheckBoxTeacher(false)
    setToggleCheckBoxAdvisor(false)
  }

  const handleTeacherCheckBox = (value: boolean): void => {
    setToggleCheckBoxTeacher(value)
    setToggleCheckBoxStudent(false)
    setToggleCheckBoxAdvisor(false)
  }

  const handleAdvisorCheckBox = (value: boolean): void => {
    setToggleCheckBoxAdvisor(value)
    setToggleCheckBoxStudent(false)
    setToggleCheckBoxTeacher(false)
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
          <CheckBox
            label='Aluno'
            value={toggleCheckBoxStudent}
            onValueChange={(value) => handleStudentCheckBox(value)}
          />

          <CheckBox
            label='Professor'
            value={toggleCheckBoxTeacher}
            onValueChange={(value) => handleTeacherCheckBox(value)}
          />

          <CheckBox
            label='Técnico'
            value={toggleCheckBoxAdvisor}
            onValueChange={(value) => handleAdvisorCheckBox(value)}
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
          <TouchableOpacity style={styles.loginButton} onPress={() => {}}>
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
