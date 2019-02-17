import React, { Component } from 'react'
import { Query } from 'react-apollo'
import { GET_NOVEL_BY_UUID } from '../graphql/novel'
import { Platform, StyleSheet, Dimensions, View, Text, Image } from 'react-native'
import { Container, Content, Header, Left, Button, Thumbnail } from 'native-base'
import { Icon, AppLoading } from 'expo'
import Colors from '../constants/Colors'

class NovelScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    header: null,
  })

  render () {
    const uuid = this.props.navigation.getParam('uuid', null)

    if (!uuid) {
      return (
        <Container>
          <Content>
            <Text>not found novel's uuid</Text>
          </Content>
        </Container>
      )
    }
    
    return (
      <Query query={GET_NOVEL_BY_UUID} variables={{ uuid: uuid }}>
        {({ loading, error, data }) => {
          if(loading) {
            return <AppLoading />
          }

          if(error) {
            <Container style={styles.container}>
              <Content>
                <View style={styles.content}>
                  <Text>NovelScreen Error</Text>
                </View>
              </Content>
            </Container>
          }

          console.log(data.Novel[0])

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

              {data.Novel &&
                <Content style={styles.content}>
                  <Image
                    source={{uri: data.Novel[0].image[0]}}
                    style={styles.image}
                  />
                  <View style={styles.words}>
                    <Text style={styles.title}>{data.Novel[0].title}</Text>

                    <View style={styles.divider} />
                    
                    <View style={styles.writer}>
                      <Thumbnail small source={{uri: data.Novel[0].write_user.avatar}} style={styles.avatar} />
                      <View>
                        <Text style={styles.writerName}>ノベルオーナー: {data.Novel[0].write_user.name}</Text>
                        <Text style={styles.date}>{data.Novel[0].updated_at.formatted}にこの記事は更新されています。</Text>
                      </View>
                    </View>

                    <View style={styles.divider} />
                    
                    <Text style={styles.description}>{data.Novel[0].description}</Text>
                    <View style={styles.divider} />
                    <Text style={styles.station}>最寄駅: {data.Novel[0].station}</Text>
                    <Text style={styles.address}>住所: {data.Novel[0].address}</Text>
                  </View>
                </Content>
              }
            </Container>
          )
        }}
      </Query>
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