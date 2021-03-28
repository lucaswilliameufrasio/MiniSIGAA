import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native'

export default function GuestHome (): JSX.Element {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerLeading}>MiniSIGAA</Text>
      </View>
      <View style={styles.content}>
        <Text>Mini Academic Management System!</Text>
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
    height: '100%',
    justifyContent: 'center'
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },

  headerLeading: {
    fontFamily: 'RedHatDisplay_900Black',
    marginLeft: 10
  }
})
