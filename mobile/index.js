import 'react-native-gesture-handler'
import { registerRootComponent } from 'expo'

import Routes from './src/main/routes/Routes'
// import GuestHome from './src/presentation/screens/GuestHome'

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in the Expo client or in a native build,
// the environment is set up appropriately
registerRootComponent(Routes)
