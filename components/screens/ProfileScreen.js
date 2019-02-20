import React, { Component } from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { Container, Content, Thumbnail, Button } from 'native-base'
import Colors from '../../constants/Colors'
import LoginBlock from '../other/LoginBlock'
import { logout, userCollection } from '../../modules/firebase'

class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Novel',
  })

  componentWillMount() {
    if(this.props.user.uid) {
      userCollection.doc(this.props.user.uid).onSnapshot(doc => {
        const properties = doc.data()
        this.props.handleSetUserProperties(properties)
      })
    }
  }

  render () {
    if(this.props.user.uid) {

      const tempAvatar = 'https://firebasestorage.googleapis.com/v0/b/novels-a5884.appspot.com/o/temp%2Ftemp.png?alt=media&token=a4d36af6-f5e8-49ad-b9c0-8b5d4d899c0d'

      return (
        <Container style={styles.container}>
          <Content>
            <View style={styles.content}>
              <Thumbnail
                large
                source={{uri: this.props.user.properties.avatar? this.props.user.properties.avatar : tempAvatar}}
                style={styles.avatar}
              />
              {/* <Text>{this.props.user.uid}</Text> */}
              <Text style={styles.name}>{this.props.user.properties.name? this.props.user.properties.name : '未設定'}</Text>
              <Button
                style={styles.logout}
                transparent
                dark
                onPress={logout}
              >
                <Text style={styles.logoutText}>Logout</Text>
              </Button>
            </View>
          </Content>
        </Container>
      )
    }
    else {
      return (
        <Container style={styles.container}>
          <Content>
            <View style={styles.content}>
              <LoginBlock />
            </View>
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
  logout: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logoutText: {
    fontSize: 12,
  },
})

export default ProfileScreen
