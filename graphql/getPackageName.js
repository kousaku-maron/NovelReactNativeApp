import gql from 'graphql-tag'

export const getPackageNameQuery = gql`
  query {
    apolloClientDemo @client {
      currentPackageName
    }
  }
`

export const getPackageNameOptions = ({
  props: ({ data: { apolloClientDemo } }) => ({
    apolloClientDemo,
  })
})