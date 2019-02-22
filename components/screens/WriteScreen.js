import React, { Component } from 'react'
import { StyleSheet, View, Text, Dimensions } from 'react-native'
import { Container, Content, Button, Thumbnail, Badge, Item, Input, Label, Textarea } from 'native-base'
import { Icon, ImagePicker } from 'expo'
import Colors from '../../constants/Colors'
import { getNewNovelDoc, uploadNovelImage, getUid, getNowDate } from '../../modules/firebase'
import { acceptCameraRollPermissions } from '../../modules/permissions'

const initialState = {
  title: null,
  body: null,
  image: null,
}

class WriteScreen extends Component {
  constructor(props) {
    super(props)
    this.state={
      ...initialState,
      uploading: false,
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Novel',
  })

  componentDidMount() {
    this.novelRef = getNewNovelDoc()
  }

  pickImage = async () => {
    const isAccepted = await acceptCameraRollPermissions()

    if(isAccepted) {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [9, 9]
      })

      if (!result.cancelled) {
        this.setState({ image: result.uri })
        console.log(result.uri)
      }
    }
  }

  writeNovel = async (properties) => {
    try{
      this.setState({ uploading: true })

      const { uid } = getUid()
      const uuid = this.novelRef.id

      let downloadUrl = null
      if (this.state.image) {
        downloadUrl = await uploadNovelImage(this.state.image, uuid)
      }

      await this.novelRef.set({
        title: properties.title,
        body: properties.body,
        image: downloadUrl,
        writer: uid,
        created_at: getNowDate(),
        updated_at: getNowDate(),
      })

      this.setState({ ...initialState })
      this.props.navigation.navigate('Novel', { uuid })
    }
    catch(e) {
      console.log(e)
    }
    finally {
      this.setState({ uploading: false })
    }
  }

  render () {
    return (
      <Container style={styles.container}>
        <Content>
          <View style={styles.content}>
            <View style={styles.imageSection}>
              {this.state.image? (
                <Thumbnail
                  large
                  square
                  source={{ uri: this.state.image }}
                  style={styles.image}
                />
              ) : null}

              <Badge style={styles.iconButton}>
                <Icon.AntDesign
                  name='plus'
                  size={50}
                  color='white'
                  onPress={this.pickImage}
                />
              </Badge>
            </View>
            
            <View style={styles.textSection}>
              <Item style={styles.title} floatingLabel>
                <Label>タイトル</Label>
                <Input
                  onChangeText={title => this.setState({ title })}
                />
              </Item>

              <Textarea
                style={styles.description}
                rowSpan={
                  this.state.description?
                  this.state.description.length < 100? 10: 15
                  : 10
                }
                bordered
                placeholder='概要'
                onChangeText={body => this.setState({ body })}
              />
            </View>

            <Button
              style={styles.button}
              dark
              rounded
              onPress={() => this.writeNovel(this.state)}
              disabled={this.state.uploading}
            >
              <Text style={styles.buttonText}>ノベルを出版</Text>  
            </Button>
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
    backgroundColor: 'white',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageSection: {
    position: 'relative',
    width: width,
    height: width,
    backgroundColor: Colors.palette.primary.main,
    marginBottom: 20,
  },
  image: {
    width: width,
    height: width,
  },
  iconButton: {
    position: 'absolute',
    bottom: -32,
    right: width/20,
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  textSection: {
    padding: 10,
  },
  title: {
    width: width*9/10,
    marginBottom: 20,
  },
  description: {
    width: width*9/10,
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

export default WriteScreen
