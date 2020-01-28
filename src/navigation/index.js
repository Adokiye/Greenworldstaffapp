import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import LoadingScreen from '../components/Loading/loadingScreen';
import AuthenticationStack from './stackNavigator';
import DashboardStack from './stackNavigatorDashboard';

export const RootNavigator = createSwitchNavigator(
  {
    LoadingScreen: LoadingScreen,
    Auth: AuthenticationStack,
    App: DashboardStack,
  },
  {
    initialRouteName: 'LoadingScreen',
  },
);
const AppContainer = createAppContainer(RootNavigator);
export default AppContainer;
