import 'react-native-gesture-handler'
import { registerRootComponent } from 'expo'

import Main from './src/main'
// import GuestHome from './src/presentation/screens/GuestHome'

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(Main)
