import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Header: React.FC = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerLeading}>MiniSIGAA</Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
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
