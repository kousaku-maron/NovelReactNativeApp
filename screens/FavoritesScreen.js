import React, { Component } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Container, Content } from 'native-base'

class FavoritesScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Novels',
  })

  render () {
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.content}>
            <Text>FavoritesScreen</Text>
          </View>
        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default FavoritesScreen
