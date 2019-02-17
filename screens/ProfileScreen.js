import React, { Component, useState } from 'react'
import { Platform, StyleSheet, AsyncStorage } from 'react-native'
import { View, Text, Image, Dimensions } from 'react-native'
import { Container, Content, Button } from 'native-base'
import { Icon } from 'expo'
import Colors from '../constants/Colors'
import LoginBlock from '../components/LoginBlock' 

class ProfileScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      uid: null
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Novel',
  })

  async componentDidMount() {
    let uid = await AsyncStorage.getItem('uid')
    if(uid !== null) {
      this.setState({ uid: uid })
    }
    else {
      this.setState({ uid: null })
    }
  }

  render () {
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.content}>
            <Text>{this.state.uid}</Text>
            {/* <Text>ProfileScreen</Text> */}
            <LoginBlock />
          </View>
        </Content>
      </Container>
    )
  }
}

const { width, height } = Dimensions.get('window')

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

export default ProfileScreen