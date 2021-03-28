import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import GuestHome from '@/presentation/screens/guest-home/guest-home'

const Stack = createStackNavigator()

const Router: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='GuestHome'
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='GuestHome' component={GuestHome}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router
