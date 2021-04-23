import 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { render } from '@testing-library/react-native'

import { GuestHome } from '@/presentation/screens'

const StackRoute = createStackNavigator()

it('renders correctly', () => {
  render(
    <NavigationContainer>
      <StackRoute.Navigator initialRouteName='GuestHome'>
        <StackRoute.Screen name='GuestHome' component={GuestHome} />
      </StackRoute.Navigator>
    </NavigationContainer>
  )
})
