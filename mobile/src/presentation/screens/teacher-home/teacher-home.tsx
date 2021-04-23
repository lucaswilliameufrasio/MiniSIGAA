import React, { ReactElement } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

import { Header, ScreenWrapper } from '@/presentation/components'

const LIST_MOCKED_DATA = Array.from(
  Array(20).fill({
    name: 'Arquitetura e Desempenho de Banco de Dados',
    code: 'PC98910788',
    class: 'BSI2017'
  }),
  (item, value) => ({
    ...item,
    id: value
  })
)

const TeacherHome = (): JSX.Element => {
  const renderListItem = ({
    item,
    index
  }: {
    item: any
    index: number
  }): ReactElement => (
    <View key={index.toString()} style={styles.listItemContainer}>
      {index === 0
        ? (
        <View style={styles.HomeHeaderContainer}>
          <Text style={styles.HomeHeaderText}>Gerenciar Disciplinas</Text>
        </View>
          )
        : null}
      <TouchableOpacity style={styles.listItemButton}>
        <Text style={styles.boldText}>{item.name}</Text>
        <Text style={styles.regularText}>Código: {item.code}</Text>
        <Text style={styles.regularText}>Turma: {item.class}</Text>
      </TouchableOpacity>
    </View>
  )

  return (
    <ScreenWrapper>
      <Header />
      <View style={styles.advisorContainer}>
        <FlatList
          data={LIST_MOCKED_DATA}
          contentContainerStyle={{ paddingBottom: 60 }}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={renderListItem}
          showsVerticalScrollIndicator={false}
          initialNumToRender={10}
        />
      </View>
    </ScreenWrapper>
  )
}

export default TeacherHome

const styles = StyleSheet.create({
  HomeHeaderContainer: {
    alignItems: 'center',
    marginBottom: 16,
    paddingTop: 40
  },

  HomeHeaderText: {
    color: '#000',
    fontFamily: 'Roboto_700Bold',
    fontSize: 18
  },

  advisorContainer: {},

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
