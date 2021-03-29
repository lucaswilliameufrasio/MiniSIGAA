import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { AdvisorTeacherManagement, GuestHome, Login } from '@/presentation/screens'

const Stack = createStackNavigator()

const Router: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='AdvisorTeacherManagement'
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='GuestHome' component={GuestHome}></Stack.Screen>
        <Stack.Screen name='Login' component={Login}></Stack.Screen>
        <Stack.Screen name='AdvisorTeacherManagement' component={AdvisorTeacherManagement}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router
