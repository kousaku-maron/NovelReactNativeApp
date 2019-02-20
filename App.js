import React from 'react'
import { Provider } from 'react-redux'
import { AsyncStorage } from 'react-native'
import { createAppContainer } from 'react-navigation'
import AppNavigator from './navigation/AppNavigator'
import configureStore from './configureStore'

const store = configureStore()

const AppContainer = createAppContainer(AppNavigator)

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    )
  }
}

export default App
