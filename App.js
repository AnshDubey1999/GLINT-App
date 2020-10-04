import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import SearchScreen from './src/screens/SearchScreen';
import ResultScreen from './src/screens/ResultScreen';
import DetailScreen from './src/screens/DetailScreen';

const navigator = createStackNavigator({
  Search: SearchScreen,
  Detail: DetailScreen,
  Result: ResultScreen
}, {
  initialRouteName: 'Search',
  defaultNavigationOptions: {
    title: 'Home'
  }
});

export default createAppContainer(navigator);
