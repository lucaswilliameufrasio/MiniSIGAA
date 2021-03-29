import React, { useState } from 'react'
import { StackActions, useNavigation } from '@react-navigation/core'
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from 'react-native'

const Header: React.FC = () => {
  const navigation = useNavigation()
  const [showActions, setShowActions] = useState(false)

  const handleLogout = (): void => {
    handleHeaderActionsShow()
    navigation.dispatch({
      ...StackActions.replace('GuestHome')
    })
  }

  const handleHeaderActionsShow = (): void => {
    setShowActions((old) => !old)
  }

  return (
    <View style={styles.header}>
      <Text style={styles.headerLeading}>MiniSIGAA</Text>
      <Modal
        visible={showActions}
        transparent
        statusBarTranslucent
        onRequestClose={() => setShowActions(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.actionsContainer}>
            <Pressable onPress={handleLogout} style={styles.logoutActionButton}>
              <Text style={styles.logoutActionButtonText}>Sair</Text>
            </Pressable>

            <Pressable
              onPress={handleHeaderActionsShow}
              style={styles.cancelActionButton}
            >
              <Text style={styles.cancelActionButtonText}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.headerActionContainer}>
        <TouchableOpacity onPress={handleHeaderActionsShow}>
          <Text style={styles.headerActionText} numberOfLines={1}>
            John Doe
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
  actionsContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 5,
    margin: 20,
    padding: 26,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4
  },

  cancelActionButton: {
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    padding: 10,
    width: 80
  },

  cancelActionButtonText: { color: 'black' },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%'
  },
  headerActionContainer: {
    alignItems: 'center'
  },

  headerActionText: {
    color: '#000',
    fontFamily: 'Roboto_700Bold',
    marginRight: 10,
    textAlign: 'right',
    width: 100
  },

  headerLeading: {
    fontFamily: 'RedHatDisplay_900Black',
    fontSize: 16,
    marginLeft: 10
  },

  logoutActionButton: {
    alignItems: 'center',
    backgroundColor: 'red',
    borderRadius: 8,
    marginBottom: 8,
    padding: 10,
    width: 80
  },

  logoutActionButtonText: { color: 'white' },

  modalContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.10)',
    justifyContent: 'center'
  }
})
