import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { GuestHome, Login } from '@/presentation/screens'

const Stack = createStackNavigator()

const Router: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Login'
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='GuestHome' component={GuestHome}></Stack.Screen>
        <Stack.Screen name='Login' component={Login}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router
