import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { withClientState } from 'apollo-link-state'
import { setContext } from 'apollo-link-context'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { getToken } from './modules/firebase'
import { initialState } from './state'

const cache = new InMemoryCache()

const stateLink = withClientState({
  cache,
  defaults: initialState,
  resolvers: {},
})

const httpLink = new HttpLink({
  uri: 'https://us-central1-novels-a5884.cloudfunctions.net/api/graphql'
})
  
const authLink = setContext((_, { headers }) => {
  const { token, error } = getToken()

  if (error) console.log(error)
  if (token) console.log(token)

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

const client = new ApolloClient({
  link: ApolloLink.from([stateLink, authLink, httpLink]),
  cache,
})

export default client