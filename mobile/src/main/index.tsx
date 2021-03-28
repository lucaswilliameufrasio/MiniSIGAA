import React from 'react'
import Router from '@/main/routes/router'
import { StatusBar } from 'react-native'

const Main: React.FC = () => {
  return (
    <>
      <Router />
      <StatusBar
        backgroundColor='transparent'
        translucent
        barStyle='dark-content'
      />
    </>
  )
}

export default Main
