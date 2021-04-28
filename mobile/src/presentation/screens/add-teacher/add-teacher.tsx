import React, { useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'
import {
  Header,
  Input,
  ScreenWrapper,
  SelectListItem
} from '@/presentation/components'
import { api } from '@/services/api'
import { useSnackBars } from '@/presentation/contexts/snack'
import { useNavigation } from '@react-navigation/core'

const AddTeacher = (): JSX.Element => {
  const [name, setName] = useState<string>('')
  const [registration, setRegistration] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [cpf, setCPF] = useState<string>('')
  const [sex, setSex] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [city, setCity] = useState<string>('')
  const [state, setState] = useState<string>('')
  const [street, setStreet] = useState<string>('')
  const [houseNumber, setHouseNumber] = useState<string>('')
  const navigator = useNavigation()
  const { addAlert } = useSnackBars()

  const handleSubmit = async (): Promise<void> => {
    try {
      const data = {
        name,
        registration,
        email,
        password,
        cpf,
        sex: sex === 'Masculino' ? 'male' : 'female',
        age,
        city,
        state,
        street,
        house_number: houseNumber
      }
      await api.post('teachers', data)
      navigator.goBack()
    } catch (error: any) {
      const statusCode = error.response?.status ?? 500
      if (statusCode === 400) {
        addAlert('Campos inválidos ou não preenchidos.')
        return
      } else if (statusCode === 403) {
        addAlert('Você não permissão para realizar essa ação.')
        return
      }
      addAlert('Ocorreu um erro inesperado.')
    }
  }

  return (
    <ScreenWrapper>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <Text style={styles.containerTitle}>Adicionar Professor</Text>
        <Input label='Nome' value={name} onChangeText={setName} />
        <Input
          label='Registro'
          value={registration}
          onChangeText={setRegistration}
        />
        <Input label='Email' value={email} onChangeText={setEmail} />
        <Input label='Senha' value={password} onChangeText={setPassword} />
        <Input label='CPF' value={cpf} onChangeText={setCPF} />
        <SelectListItem
          label='Sexo'
          title={'Selecione o sexo'}
          values={['Masculino', 'Feminino']}
          selectedOption={sex}
          onChangeSelect={(value) => setSex(value)}
        />
        <Input label='Idade' value={age} onChangeText={setAge} />
        <Input label='Cidade' value={city} onChangeText={setCity} />
        <Input label='Estado' value={state} onChangeText={setState} />
        <Input label='Rua' value={street} onChangeText={setStreet} />
        <Input
          label='Número da casa'
          value={houseNumber}
          onChangeText={setHouseNumber}
        />

        <View style={styles.submitButtonContainer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Concluir</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20
  },

  containerTitle: {
    fontFamily: 'RedHatDisplay_700Bold',
    fontSize: 24,
    paddingBottom: 20
  },

  submitButton: {
    alignItems: 'center',
    borderColor: 'rgba(0, 0, 0, .26)',
    borderRadius: 20,
    borderWidth: 1,
    height: 60,
    justifyContent: 'center',
    marginTop: 10,
    width: 260
  },

  submitButtonContainer: {
    alignItems: 'center'
  },

  submitButtonText: {
    color: '#000',
    fontFamily: 'Roboto_700Bold',
    fontSize: 16
  }
})

export default AddTeacher
