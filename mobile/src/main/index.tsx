import React from 'react'
import { StatusBar, ActivityIndicator } from 'react-native'
import { useFonts } from 'expo-font'
import {
  RedHatDisplay_400Regular,
  RedHatDisplay_700Bold,
  RedHatDisplay_900Black
} from '@expo-google-fonts/red-hat-display'
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto'
import Router from '@/main/routes/router'
import { SnackBarProvider } from '@/presentation/contexts/snack'

const Main: React.FC = () => {
  const [fontsLoaded] = useFonts({
    RedHatDisplay_400Regular,
    RedHatDisplay_700Bold,
    RedHatDisplay_900Black,
    Roboto_400Regular,
    Roboto_700Bold
  })

  if (!fontsLoaded) {
    return <ActivityIndicator />
  } else {
    return (
      <SnackBarProvider>
        <Router />
        <StatusBar
          backgroundColor='transparent'
          translucent
          barStyle='dark-content'
        />
      </SnackBarProvider>
    )
  }
}

export default Main
