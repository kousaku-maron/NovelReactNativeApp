import React from 'react'
import { AsyncStorage } from 'react-native'
import { ApolloProvider, Mutation } from 'react-apollo'
import { createAppContainer } from 'react-navigation'
import AppNavigator from './navigation/AppNavigator'
import client from './client'
import { auth } from './modules/firebase'

const AppContainer = createAppContainer(AppNavigator)

class App extends React.Component {
  componentWillMount() {
    auth.onAuthStateChanged(user => {
      if(user) {
        console.log(`uid: ${user.uid}`)
        AsyncStorage.setItem('uid', user.uid)
      }
      else {
        console.log('signout...')
        AsyncStorage.removeItem('uid')
      }
    })
  }

  render() {
    return (
      <ApolloProvider client={client}>
        <AppContainer />
      </ApolloProvider>
    )
  }
}

export default App