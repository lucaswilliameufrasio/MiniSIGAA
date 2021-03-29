import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import {
  AdvisorHome,
  AdvisorStudentManagement,
  AdvisorTeacherManagement,
  GuestHome,
  Login
} from '@/presentation/screens'

const Stack = createStackNavigator()

const Router: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='AdvisorStudentManagement'
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name='GuestHome' component={GuestHome} />
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='AdvisorHome' component={AdvisorHome} />
        <Stack.Screen
          name='AdvisorTeacherManagement'
          component={AdvisorTeacherManagement}
        />
        <Stack.Screen
          name='AdvisorStudentManagement'
          component={AdvisorStudentManagement}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Router
