import React, { Component } from 'react'
import { Platform, StyleSheet, View, Text, Dimensions } from 'react-native'
import { Container, Content, Header, Left, Thumbnail, Button, Item, Input, Badge } from 'native-base'
import { Icon, ImagePicker } from 'expo'
import Colors from '../../constants/Colors'
import LoginBlock from '../other/LoginBlock'
import { userCollection, userRef } from '../../modules/firebase'
import { acceptCameraRollPermissions } from '../../modules/permissions'

class ProfileEditScreen extends Component {
  constructor(props) {
    super(props)
    this.state={
        name: null,
        avatar: null,
    }
  }

  static navigationOptions = ({ navigation }) => ({
    header: null,
  })

  componentWillMount() {
    if(this.props.user.uid) {
      this.unsubscribe = userCollection.doc(this.props.user.uid).onSnapshot(doc => {
        const properties = doc.data()
        this.props.handleSetUserProperties(properties)
        
        this.setState({
          name: doc.data().name? doc.data().name : null,
          avatar: doc.data().avatar? doc.data().avatar : null,
        })
      })
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  takePhoto = async () => {
    const isAccepted = await acceptCameraRollPermissions()

    if(isAccepted) {
      if(allowsEditing) {
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [9, 9]
        })

        if (!result.cancelled) {
          this.setState({ avatar: result.uri })
          console.log(result.uri)
        }
      }
    }
  }

  pickImage = async () => {
    const isAccepted = await acceptCameraRollPermissions()

    if(isAccepted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [9, 9]
      })

      if (!result.cancelled) {
        this.setState({ avatar: result.uri })
        console.log(result.uri)
      }
    }
  }

  updateProfile = async (properties) => {
    const avatarRef = userRef.child(`${this.props.user.uid}/avatar1.png`)

    let avatarUrl = null
    if (this.state.avatar) {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()
        xhr.onload = () => {
          resolve(xhr.response)
        }

        xhr.onerror = e => {
          console.log(e)
          reject(new TypeError('Network request failed'))
        }

        xhr.responseType = 'blob'
        xhr.open('GET', this.state.avatar, true)
        xhr.send(null)
      })

      await avatarRef.put(blob).then(async (snapshot) => {
        await snapshot.ref.getDownloadURL().then(downloadURL => {
          console.log('File available at', downloadURL)
          avatarUrl = downloadURL
        })
      })

      blob.close()
    }

    userCollection.doc(this.props.user.uid).set({
      name: properties.name,
      avatar: avatarUrl,
    })
  }

  render () {
    if(this.props.user.uid) {

      const tempAvatar = 'https://firebasestorage.googleapis.com/v0/b/novels-a5884.appspot.com/o/temp%2Ftemp.png?alt=media&token=a4d36af6-f5e8-49ad-b9c0-8b5d4d899c0d'

      return (
        <Container style={styles.container}>
          <Header transparent>
            <Left>
              <Button
                transparent
                onPress={() => this.props.navigation.goBack()}
              >
                <Icon.Ionicons
                  name={
                    Platform.OS === 'ios'
                    ? 'ios-arrow-back'
                    : 'md-arrow-back'
                  }
                  size={24}
                  style={styles.backButton}
                  color={Colors.palette.primary.main}
                />
              </Button>
            </Left>
          </Header>
          
          <Content>            
            <View style={styles.content}>
              {this.state.avatar? (
                <Thumbnail
                  large
                  source={{ uri: this.state.avatar? this.state.avatar : tempAvatar }}
                  style={styles.avatar}
                />
              ) : (
                <Thumbnail
                  large
                  source={{ uri: this.props.user.properties.avatar? this.props.user.properties.avatar : tempAvatar }}
                  style={styles.avatar}
                />
              )}
              
              <Badge style={styles.iconButton}>
                <Icon.AntDesign
                  name='plus'
                  size={50}
                  color='white'
                  onPress={this.pickImage}
                />
              </Badge>
              <Item style={styles.name} rounded>
                  <Input
                    placeholder={this.props.user.properties.name}
                    onChangeText={name => this.setState({ name })}
                  />
              </Item>
              <Button
                style={styles.button}
                dark
                rounded
                onPress={() => this.updateProfile(this.state)}
              >
                <Text style={styles.buttonText}>プロフィールを保存</Text>
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
    position: 'relative',
    width: width*2/3,
    height: width*2/3,
    borderRadius: width/3,
    margin: 20,
  },
  iconButton: {
    position: 'absolute',
    bottom: 140,
    right: 60,
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  name: {
    width: width*2/3,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  buttonText: {
    fontSize: 12,
    color: 'white',
  }
})

export default ProfileEditScreen
