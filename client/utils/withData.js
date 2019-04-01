
  
import withApollo from 'next-with-apollo'
//import ApolloClient from 'apollo-boost'
import { ApolloClient } from 'apollo-client'
import { endpoint, prodEndpoint, endpointWS, prodEndpointWS } from '../config'
import { split, Observable } from 'apollo-link'
import { createHttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { getMainDefinition } from 'apollo-utilities'
import { InMemoryCache } from 'apollo-cache-inmemory'
import ws from 'ws'
import fetch from 'isomorphic-fetch'
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'




function createClient({headers}) {
  console.log('HEAD',headers)
  const ssrMode = !process.browser
  if (ssrMode) {
    global.fetch = fetch
  }
 
 
  const httpLink = createHttpLink({
    uri: 'http://localhost:4000/',
    credentials: 'include',
    headers
  })
  
  const contextLink = setContext((operation, previousContext) => {headers})
  
  const wsLink = new WebSocketLink({
    uri: `ws://localhost:4000/subscriptions`,
    options: {
      reconnect: true,
    },
    webSocketImpl: !process.browser ? ws : null
  })

  const errorLink = onError(
    ({ graphQLErrors, networkError }) => {
      if (graphQLErrors) {
        graphQLErrors.map(err =>
          console.log(`[GraphQL error]: Message: ${err.message}`)
        )
      }
      if (networkError) console.log(`[Network error]: ${networkError}`)
    }
  )

  let link = ApolloLink.from([errorLink, contextLink, httpLink])
  
  if (!ssrMode) {
    link = split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        )
      },
      wsLink,
      link
    )
  }
  
  return new ApolloClient({
    link,
    cache: new InMemoryCache(),
    ssrMode
  })
  
}


export default withApollo(createClient);