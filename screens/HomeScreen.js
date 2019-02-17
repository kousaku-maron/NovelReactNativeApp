import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { GET_NOVEL_ALL } from '../graphql/novel'
import { StyleSheet } from 'react-native'
import { Container, Content, View, Text } from 'native-base'
import { AppLoading } from 'expo'
import Colors from '../constants/Colors'
import NovelCard from '../components/NovelCard'

import Test from '../components/LocalStateTest'

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Novel',
  })

  componentWillMount () {
    console.log('get home cards.')
  }

  render () {
    return (
      <Query query={GET_NOVEL_ALL}>
        {({ loading, error, data }) => {
          if(loading) {
            return <AppLoading />
          }

          if(error) {
            console.log(error)

            return (
              <Container style={styles.container}>
                <Content>
                  <View style={styles.content}>
                    <Text>HomeScreen Error</Text>
                  </View>
                </Content>
              </Container> 
            )
          }

          return (
            <Container style={styles.container}>
              <Content>
                {data && data.Novel && data.Novel.map(element => (
                  <NovelCard
                    key={element.uuid}
                    uuid={element.uuid}
                    title={element.title}
                    image={element.image[0]}
                    created_at={element.created_at.formatted}
                    navigation={this.props.navigation}
                  />
                ))}
              </Content>
            </Container>
          )
        }}
      </Query>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.palette.inherit,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default HomeScreen