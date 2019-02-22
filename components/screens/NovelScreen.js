import React, { Component } from 'react'
import { Platform, StyleSheet, Dimensions, View, Text, Image } from 'react-native'
import { Container, Content, Header, Left, Button, Thumbnail } from 'native-base'
import moment from 'moment-timezone'
import { Icon } from 'expo'
import Colors from '../../constants/Colors'
import { novelCollection, userCollection } from '../../modules/firebase'

class NovelScreen extends Component {
  constructor(props) {
    super(props)
    this.state={
      novel: null,
      writer: null,
    }
  }

  static navigationOptions = ({ navigation }) => ({
    header: null,
  })

  componentWillMount() {
    const uuid = this.props.navigation.getParam('uuid', null)

    if(uuid) {
      this.unsubscribe = novelCollection.doc(uuid).onSnapshot(doc => {
        const novel = doc.data()

        let date
        try {
          date = moment.unix(novel.updated_at.seconds).format('YYYY/MM/DD HH:mm:ss')
        }
        catch (e) {
          console.log(e)
          date = '投稿日不明'
        }

        this.setState({
          novel : {
            image: novel.image,
            title: novel.title,
            body: novel.body,
            station: novel.station,
            address: novel.address,
            writer: novel.writer,
            updated_at: date,
          }
        })

        userCollection.doc(novel.writer).get()
        .then(_doc => {
          if(_doc.exists) {
            const user = _doc.data()
            this.setState({
              user: {
                name: user.name,
                avatar: user.avatar,
              }
            })
          }
          else {
            this.setState({
              user: {
                name: null,
                avatar: null,
              }
            })
          }
        })
        .catch(error => {
          this.setState({
            user: {
              name: null,
              avatar: null,
            }
          })
          console.log(error)
        })
      })
    }
  }

  render () {
    if (!this.state.novel) {
      return (
        <Container>
          <Content>
            <Text>not found novel data</Text>
          </Content>
        </Container>
      )
    }
    
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
                style={styles.backBtn}
                color={Colors.palette.primary.main}
              />
            </Button>
          </Left>
        </Header>

        {this.state.novel &&
          <Content style={styles.content}>
            <Image
              source={{uri: this.state.novel.image}}
              style={styles.image}
            />
            <View style={styles.words}>
              <Text style={styles.title}>{this.state.novel.title}</Text>

              <View style={styles.divider} />
              
              {this.state.user &&
                <View style={styles.writer}>
                  <Thumbnail small source={{uri: this.state.user.avatar}} style={styles.avatar} />
                  <View>
                    <Text style={styles.writerName}>ノベルオーナー: {this.state.user.name}</Text>
                    <Text style={styles.date}>{this.state.novel.updated_at} にこの記事は更新されています。</Text>
                  </View>
                </View>
              }
                
              <View style={styles.divider} />
              
              <Text style={styles.description}>{this.state.novel.body}</Text>
              <View style={styles.divider} />
              <Text style={styles.station}>最寄駅: {this.state.novel.station}</Text>
              <Text style={styles.address}>住所: {this.state.novel.address}</Text>
            </View>
          </Content>
        }
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
    position: 'absolute',
    top: 0,
    zIndex: -1,
  },
  image: {
    // square !!
    width: width,
    height: width,
  },
  words: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  avatar: {
    marginRight: 5,
  },
  writer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  writerName: {
    fontSize: 10.5,
  },
  date: {
    fontSize: 10.5,
    color: 'gray',
  },
  description: {
    fontSize: 20,
  },
  station: {
    fontSize: 10.5,
  },
  address: {
    fontSize: 10.5,
  },
  divider: {
    height: 10,
  },
  dividerHalf: {
    height: 5,
  }
})

export default NovelScreen