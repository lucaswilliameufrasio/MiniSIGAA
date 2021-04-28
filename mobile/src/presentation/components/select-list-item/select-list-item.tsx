import React, { useRef, useState } from 'react'
import {
  Animated,
  Easing,
  Modal,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native'
import { AntDesign } from '@expo/vector-icons'

type Props = {
  label?: string
  title: string
  values: string[]
  selectedOption: any
  onChangeSelect: (selectedOption: any) => void
}

const SelectListItem = ({
  label,
  title,
  values,
  selectedOption,
  onChangeSelect
}: Props): JSX.Element => {
  const [open, setOpen] = useState(false)
  const animatedController = useRef(new Animated.Value(0)).current
  const arrowAngle = animatedController.interpolate({
    inputRange: [0, 1],
    outputRange: ['0rad', `${Math.PI}rad`]
  })

  const toggleListItem = (): void => {
    if (open) {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 0,
        useNativeDriver: false,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1)
      }).start()
    } else {
      Animated.timing(animatedController, {
        duration: 300,
        toValue: 1,
        useNativeDriver: false,
        easing: Easing.bezier(0.4, 0.0, 0.2, 1)
      }).start()
    }
    setOpen(!open)
  }

  return (
    <>
      <View style={{ marginBottom: 20 }}>
        {label !== undefined ? <Text style={styles.label}>{label}</Text> : null}
        <TouchableWithoutFeedback onPress={() => toggleListItem()}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{selectedOption ?? title}</Text>
            <Animated.View
              style={{ marginLeft: 7, transform: [{ rotateZ: arrowAngle }] }}
            >
              <AntDesign name='down' size={10} color='black' />
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
      </View>
      <Modal
        animationType='slide'
        visible={open}
        onRequestClose={() => toggleListItem()}
      >
        <View style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginVertical: 10,
              paddingHorizontal: 10,
              paddingBottom: 10,
              alignItems: 'center',
              borderColor: 'white',
              borderBottomColor: '#CCC',
              borderWidth: 1
            }}
          >
            <View style={{ flex: 1 }} />
            <Text style={{ flex: 2, textAlign: 'center', fontSize: 16 }}>
              {title}
            </Text>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => toggleListItem()}
            >
              <Text style={{ textAlign: 'right', color: 'blue' }}>
                Cancelar
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={values}
            keyExtractor={(_item, index) => index.toString()}
            ItemSeparatorComponent={() => (
              <View
                style={{ width: '100%', height: 1, backgroundColor: 'black' }}
              ></View>
            )}
            renderItem={({ item }) => (
              <TouchableOpacity
                key={item}
                onPress={() => {
                  toggleListItem()
                  onChangeSelect(item)
                }}
              >
                <View style={{ padding: 4, margin: 7 }}>
                  <Text>{item}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </>
  )
}

export default SelectListItem

const styles = StyleSheet.create({
  label: {
    color: '#000',
    fontFamily: 'RedHatDisplay_700Bold',
    marginBottom: 8
  },

  title: {
    color: '#000',
    fontFamily: 'RedHatDisplay_700Bold'
  },

  titleContainer: {
    alignItems: 'center',
    backgroundColor: '#F5F8FA',
    borderColor: '#D3E2E5',
    borderRadius: 20,
    borderWidth: 1.4,
    flex: 1,
    flexDirection: 'row',
    height: 56,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 18
  }
})
