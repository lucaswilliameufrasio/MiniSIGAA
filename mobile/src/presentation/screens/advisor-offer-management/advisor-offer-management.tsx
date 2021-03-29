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
  Array(80).fill({
    name: 'Arquitetura e Desempenho de Banco de Dados',
    code: 'PC98910788',
    class: 'BSI2017'
  }),
  (item, value) => ({
    ...item,
    id: value
  })
)

const AdvisorOfferManagement = (): JSX.Element => {
  const renderListItem = ({ item, index }: { item: any, index: number}): ReactElement => (
    <View key={index.toString()} style={styles.listItemContainer}>
      {index === 0
        ? (
        <View style={styles.addOfferButtonContainer}>
          <TouchableOpacity style={styles.addOfferButton} onPress={() => {}}>
            <Text style={styles.addOfferButtonText}>Adicionar Oferta</Text>
          </TouchableOpacity>
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
      <View style={styles.offerContainer}>
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

export default AdvisorOfferManagement

const styles = StyleSheet.create({
  addOfferButton: {
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

  addOfferButtonContainer: {
    marginBottom: 16,
    paddingTop: 40
  },

  addOfferButtonText: {
    color: '#FFF',
    fontFamily: 'Roboto_700Bold',
    fontSize: 14
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

  offerContainer: {
  },

  regularText: {
    color: '#6F6F6F'
  }
})
