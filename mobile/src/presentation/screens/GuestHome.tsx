import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function GuestHome (): JSX.Element {
  return (
    <View style={styles.container}>
      <Text>Mini Academic Management System!</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center'
  }
})
