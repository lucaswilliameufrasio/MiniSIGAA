import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const GuestHeader: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerLeading}>MiniSIGAA</Text>
    </View>
  )
}

export default GuestHeader

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },

  headerLeading: {
    color: '#000',
    fontFamily: 'RedHatDisplay_900Black',
    fontSize: 16,
    marginLeft: 10
  }
})
