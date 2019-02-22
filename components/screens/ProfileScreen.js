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
      this.unsubscribe = userCollection.doc(this.props.user.uid).onSnapshot(doc => {
        const properties = doc.data()
        this.props.handleSetUserProperties(properties)
      })
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render () {
    if(this.props.user.uid) {

      const tempAvatar = 'https://firebasestorage.googleapis.com/v0/b/novels-a5884.appspot.com/o/temp%2Ftemp.png?alt=media&token=a4d36af6-f5e8-49ad-b9c0-8b5d4d899c0d'

      return (
        <Container style={styles.container}>
          <Content>
            <View style={styles.content}>
              <View style={styles.profileSection}>
                <View style={styles.profileMain}>
                  <Thumbnail
                    large
                    source={{uri: this.props.user.properties.avatar? this.props.user.properties.avatar : tempAvatar}}
                    style={styles.avatar}
                  />
                  <Text style={styles.name}>{this.props.user.properties.name? this.props.user.properties.name : '未設定'}</Text>
                </View>
                <Button
                  style={styles.button}
                  transparent
                  dark
                  // rounded
                  onPress={() => this.props.navigation.navigate('Edit')}
                >
                  <Text style={styles.buttonText}>プロフィール編集</Text>
                </Button>
                {/* <Button
                  style={styles.button}
                  // transparent
                  dark
                  rounded
                  onPress={logout}
                >
                  <Text style={styles.buttonText}>ログアウト</Text>
                </Button> */}
              </View>
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
  profileSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: width,
    height: height/3,
    padding: 10,
    backgroundColor: Colors.palette.primary.main,
  },
  avatar: {
    width: height/5,
    height: height/5,
    borderRadius: height/10,
    marginBottom: 15,
  },
  name: {
    fontSize: 12,
    fontWeight: 'bold',
    color: Colors.palette.inherit,
    textAlign: 'center',
  },
  button: {
    position: 'absolute',
    padding: 10,
    bottom: 10,
    right: 10,
  },
  buttonText: {
    fontSize: 10.5,
    color: 'white',
  },
})

export default ProfileScreen
