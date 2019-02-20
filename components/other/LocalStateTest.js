import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { getPackageNameQuery } from '../graphql/getPackageName'
import { View, Text } from 'react-native'

const LocalStateTest = (props) => {
  return (
    <Query query={getPackageNameQuery}>
      {({loading, error, data}) => {
        console.log(data)
        return (
          <View>
            <Text>{data.apolloClientDemo.currentPackageName}</Text>
          </View>
        )
      }}
    </Query>
  )
}

export default LocalStateTest
