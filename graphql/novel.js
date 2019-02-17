import gql from 'graphql-tag'

export const GET_NOVEL_ALL = gql`
  query {
    Novel {
      uuid
      title
      image
      created_at {
        formatted
      }
    }
  }
`

export const GET_NOVEL_BY_UUID = gql`
  query ($uuid : ID){
    Novel (uuid: $uuid){
      uuid
      title
      description
      image
      address
      station
      updated_at {
        formatted
      }
      write_user {
        uid
        name
        avatar
      }
    }
  }
`