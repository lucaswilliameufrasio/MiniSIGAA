import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import { Header, ScreenWrapper } from '@/presentation/components'
import { api } from '@/services/api'
import { useNavigation } from '@react-navigation/core'

type Teacher = {
  name: string
  email: string
  registration: string
}

const AdvisorTeacherManagement = (): JSX.Element => {
  const [teachers, setTeachers] = useState<Teacher[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const navigator = useNavigation()

  const loadTeachers = useCallback(async (): Promise<void> => {
    const response = await api.get('teachers')
    setTeachers(response.data)
    setLoading(false)
  }, [])

  useEffect(() => {
    loadTeachers()
  }, [])

  const handleNavigationToAddTeacher = (): void => {
    navigator.navigate('AddTeacher')
  }

  const renderListItem = ({ item, index }: { item: Teacher, index: number}): ReactElement => (
    <View key={index.toString()} style={styles.listItemContainer}>
      {index === 0
        ? (
        <View style={styles.addTeacherButtonContainer}>
          <TouchableOpacity style={styles.addTeacherButton} onPress={handleNavigationToAddTeacher}>
            <Text style={styles.addTeacherButtonText}>Adicionar Professor</Text>
          </TouchableOpacity>
        </View>
          )
        : null}
      <TouchableOpacity style={styles.listItemButton}>
        <Text style={styles.boldText}>{item.name}</Text>
        <Text style={styles.regularText}>{item.email}</Text>
        <Text style={styles.regularText}>Registro: {item.registration}</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <ScreenWrapper>
      <Header />
      <View style={styles.advisorContainer}>
        <FlatList
          data={teachers}
          refreshing={loading}
          onRefresh={loadTeachers}
          contentContainerStyle={{ paddingBottom: 60 }}
          keyExtractor={(item: any) => item.name}
          renderItem={renderListItem}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
        />
      </View>
    </ScreenWrapper>
  )
}

const styles = StyleSheet.create({
  addTeacherButton: {
    alignItems: 'center',
    backgroundColor: '#000',
    borderColor: 'rgba(0, 0, 0, .26)',
    borderRadius: 8,
    borderWidth: 1,
    height: 50,
    justifyContent: 'center',
    marginTop: 10,
    width: 180
  },

  addTeacherButtonContainer: {
    marginBottom: 16,
    paddingTop: 40
  },

  addTeacherButtonText: {
    color: '#FFF',
    fontFamily: 'Roboto_700Bold',
    fontSize: 14
  },

  advisorContainer: {
  },

  boldText: {
    color: '#000',
    fontFamily: 'Roboto_700Bold',
    fontSize: 18,
    fontWeight: 'bold'
  },

  listItemButton: {
    borderColor: 'rgba(0, 0, 0, .26)',
    borderRadius: 8,
    borderWidth: 2,
    padding: 8
  },

  listItemContainer: {
    margin: 8
  },

  regularText: {
    color: '#6F6F6F'
  }
})

export default AdvisorTeacherManagement
