import React from 'react'
import { StyleSheet, View, StatusBar } from 'react-native'

const ScreenWrapper: React.FC = ({ children }) => {
  return <View style={styles.container}>{children}</View>
}

export default ScreenWrapper

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
    paddingTop: StatusBar.currentHeight
  }
})
