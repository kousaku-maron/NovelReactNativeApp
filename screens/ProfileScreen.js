import React, { Component } from 'react'
import { StyleSheet, AsyncStorage, View, Text, Dimensions } from 'react-native'
import { Container, Content, Thumbnail } from 'native-base'
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

  async componentWillMount() {
    let uid = await AsyncStorage.getItem('uid')

    if(uid) {
      this.setState({ uid })
    }
    else {
      this.setState({ uid: null })
    }
  }

  renderProfile({uid, avatar, name}) {
    return (
      <View style={styles.content}>
        {avatar? (
          <Thumbnail
            large
            source={{uri: avatar}}
            style={styles.avatar}
          />
        ) : (
          null
        )}

        <Text style={styles.name}>{name? name: '未設定'}</Text>

        <LoginBlock />
      </View>
    )
  }

  render () {
    if(this.state.uid) {
      return (
        <Container style={styles.container}>
          <Content>
            {this.renderProfile({
              uid: null,
              name: null,
              avatar: null,
            })}
          </Content>
        </Container>
      )
    }
    else {
      return (
        <Container style={styles.container}>
          <Content>
            {this.renderProfile({
              uid: null,
              name: null,
              avatar: null,
            })}
          </Content>
        </Container> 
      )
    }
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
  avatar: {
    width: width*2/3,
    height: width*2/3,
    borderRadius: width/3,
    margin: 20,
  },
  name: {
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: 20,
  },
})

export default ProfileScreen
