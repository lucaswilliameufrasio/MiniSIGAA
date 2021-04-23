import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import RNCheckBox from '@react-native-community/checkbox'

type Props = {
  label?: String
  value: boolean
  onValueChange: (((value: boolean) => void) & ((value: boolean) => void) & ((value: boolean) => void))
}

const CheckBox = ({ label, value, onValueChange }: Props): JSX.Element => {
  return (
    <View
      style={styles.container}
    >
      <RNCheckBox
        disabled={false}
        value={value}
        onValueChange={(value) => onValueChange(value)}
        hitSlop={{ top: 120, left: 120, bottom: 120, right: 120 }}
      />
      {(label != null) ? <Text>{label}</Text> : null}
    </View>
  )
}

export default CheckBox

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginHorizontal: 8
  }
})
