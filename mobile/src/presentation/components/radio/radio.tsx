import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

type Props = {
  options: string[]
  horizontal?: boolean
  selectedOption: string
  onChangeSelect: (selectedOption: string) => void
}
const Radio = ({
  options,
  horizontal = false,
  onChangeSelect,
  selectedOption,
}: Props): JSX.Element => {
  return (
    <View
      style={{
        flexDirection: horizontal ? 'row' : 'column',
      }}
    >
      {options.map((option: string, index: number) => (
        <TouchableOpacity
          key={`${option}-${index}`}
          onPress={() => onChangeSelect(option)}
          style={[
            styles.optionContainer,
            {
              marginRight: horizontal ? 8 : 0,
              marginTop: horizontal ? 0 : 4,
            },
          ]}
        >
          <View style={styles.outlineCircle}>
            {selectedOption === option ? (
              <View style={styles.innerCircle} />
            ) : null}
          </View>
          <Text
            style={[
              styles.optionText,
              { color: selectedOption === option ? '#444' : '#777' },
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default Radio

const styles = StyleSheet.create({
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  outlineCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderColor: '#777',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  innerCircle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#444',
    borderWidth: 2,
  },

  optionText: {
    fontSize: 14,
    marginLeft: 4,
  },
})
