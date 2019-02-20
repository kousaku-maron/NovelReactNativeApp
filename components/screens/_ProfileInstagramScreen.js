import React, { Component } from 'react'
import { Platform, StyleSheet } from 'react-native'
import { View, Text, Image, Dimensions } from 'react-native'
import { Container, Content, Button } from 'native-base'
import { Icon } from 'expo'
import Colors from '../constants/Colors'

import CardComponent from '../components/CardComponent'

const PanelSection = (contents) => (
  <View style={[styles.row, styles.wrap]}>
    {contents.map((content, index) => (
      <View
        key={content.novel.identity.low}
        style={[
          styles.panel,
          index % 3 !== 0 ? { paddingLeft: 2 } : { paddingLeft: 0 },
          { marginBottom: 2 },
        ]}
      >
        <Image style={styles.panelImage} source={{uri: content.novel.properties.image}} />
      </View>
    ))}
  </View>
)

const CardSection = (contents) => (
  <View>
    {contents.map(content => (
      <View key={content.novel.identity.low}>
        <CardComponent novel={content.novel} user={content.user} />
      </View>
    ))}
  </View>
)
 
class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Novels',
  })

  componentWillMount () {
    this.props.sysGetMyNovels()
  }

  render () {
    return (
      <Container style={styles.container}>
        <Content>
          <View>
            <View style={[styles.row, styles.paddingTop10]}>
              <View style={styles.avatarBox}>
                <Image style={styles.avatar} source={{uri: 'https://s3-ap-northeast-1.amazonaws.com/petpedia/upload_by_admin/hedgehog_breeding_800.jpg'}} />
              </View>
              <View style={styles.infosFlex}>
                <View style={styles.infos}>
                  <View style={styles.info}>
                    <Text>{this.props.novels.my.contents.length}</Text>
                    <Text style={styles.gray}>novels</Text>
                  </View>
                  <View style={styles.info}>
                    <Text>??</Text>
                    <Text style={styles.gray}>followers</Text>
                  </View>
                  <View style={styles.info}>
                    <Text>??</Text>
                    <Text style={styles.gray}>following</Text>
                  </View>
                </View>
                
                <View style={[styles.row, styles.paddingTop10]}>
                  <Button bordered dark style={[styles.infosFlex, styles.editButton]}>
                    <Text>Edit Profile</Text>
                  </Button>
                </View>
              </View>
            </View>

            <View style={styles.intro}>
              <Text style={styles.nickname}>ハリー</Text>
              <Text>東京在住の社会人です。みなとみらいあたりが好きなので、よくそこら変探索しています。</Text>
            </View>
          </View>

          <View style={styles.divider}/>

          <View>
            <View style={[styles.row, styles.contents]}>
              <Button
                transparent
                active={this.props.profile.section.index === 0}
                onPress={() => this.props.userPushSectionBtn(0)}
              >
                <Icon.Ionicons
                  name='md-apps'
                  size={24}
                  style={[this.props.profile.section.index === 0 
                    ? { color: Colors.tabIconSelected }
                    : { color: Colors.tabIconDefault }
                  ]}
                />
              </Button>
              <Button
                transparent
                active={this.props.profile.section.index === 1}
                onPress={() => this.props.userPushSectionBtn(1)}
              >
                <Icon.Ionicons
                  name={
                    Platform.OS === 'ios'
                      ? 'ios-list'
                      : 'md-list'
                  }
                  size={24}
                  style={[this.props.profile.section.index === 1
                    ? { color: Colors.tabIconSelected }
                    : { color: Colors.tabIconDefault }
                  ]}
                />
              </Button>
            </View>

            {this.props.profile.section.index === 0 && PanelSection(this.props.novels.my.contents)}
            {this.props.profile.section.index === 1 && CardSection(this.props.novels.my.contents)}

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
  paddingTop10: {
    paddingTop: 10,
  },
  row: {
    flexDirection: 'row',
  },
  wrap: {
    flexWrap: 'wrap',
  },
  avatarBox: {
    flex: 1,
    alignItems: 'center',
  },
  avatar: {
    width: 75,
    height: 75,
    borderRadius: 37.5,
  },
  infosFlex: {
    flex: 3,
  },
  infos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  info: {
    alignItems: 'center',
  },
  editButton: {
    marginLeft: 30,
    marginRight: 30,
    justifyContent: 'center',
    height: 30,
  },
  intro: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  gray: {
    fontSize: 10,
    color: 'gray',
  },
  nickname: {
    fontWeight: 'bold',
  },
  divider: {
    borderTopWidth: 1,
    borderTopColor: '#eae5e5',
  },
  contents: {
    justifyContent: 'space-around',
  },
  panel: {
    width: (width)/3,
    height: (width)/3,
  },
  panelImage: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
})

export default ProfileScreen