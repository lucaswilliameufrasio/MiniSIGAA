import React from 'react'
import { StyleSheet, Text, TextInputProps, TextInput } from 'react-native'

type Props = TextInputProps & {
  label: string
}
const Input = (props: Props): JSX.Element => {
  return (
    <>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput {...props} style={styles.input} />
    </>
  )
}

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
  }
})

export default Input
