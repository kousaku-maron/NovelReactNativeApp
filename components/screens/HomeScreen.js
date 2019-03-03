import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content } from 'native-base'
import moment from 'moment-timezone'
import Colors from '../../constants/Colors'
import NovelCard from '../other/NovelCard'
import { novelCollection } from '../../modules/firebase'

class HomeScreen extends Component {
  constructor(props) {
    super(props)
    this.state={
      novel: null,
    }
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Novel',
  })

  componentWillMount () {
    this.unsubscribe = novelCollection.orderBy('created_at').onSnapshot(querySnapshot => {
      const novel = []
      querySnapshot.forEach(doc => {
        novel.push({ uuid: doc.id, ...doc.data() })
      })
      novel.reverse()
      this.setState({ novel })
    })
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render () {
    return (
      <Container style={styles.container}>
        <Content>
          {this.state.novel && this.state.novel.map(element => {
            let date
            try {
              console.log(element.created_at.seconds)
              date = moment.unix(element.created_at.seconds).format('YYYY/MM/DD HH:mm:ss')
            }
            catch (e) {
              console.log(e)
              date = '投稿日不明'
            }

            return (
              <NovelCard
                key={element.uuid}
                uuid={element.uuid}
                title={element.title}
                image={element.image}
                created_at={date}
                navigation={this.props.navigation}
              />
            )
          })}
        </Content>
      </Container>
    )
  }
}

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

export default HomeScreen
