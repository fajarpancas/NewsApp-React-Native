import { NavigationActions } from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  if (_navigator) {
    // _navigator.props.dispatch(
    //   NavigationActions.navigate({
    //     routeName,
    //     params,
    //   })
    // );
    _navigator.currentNavProp.navigate(routeName, params)
  }
}

function dispatch(action) {
  const navigation = _navigator.currentNavProp
  navigation.dispatch(action)
}

function findActiveScreen(state) {
  const {routes, index} = state
  if (routes && routes[index]) {
    return findActiveScreen(routes[index])
  } else {
    return state
  }
}

function getActiveScreenAndParams() {
  const navigation = _navigator.currentNavProp
  const {state} = navigation
  return findActiveScreen(state, null)
}

// add other navigation functions that you need and export them

export default {
  navigate,
  dispatch,
  setTopLevelNavigator,
  getActiveScreenAndParams,
};