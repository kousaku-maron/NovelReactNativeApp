import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Container, Content } from 'native-base'
import Colors from '../../constants/Colors'
import NovelCard from '../other/NovelCard'

const data = {
  Novel: [
    {
      uuid: 'aa',
      title: 'hello',
      image: ['https://cdn.jalan.jp/jalan/img/4/kuchikomi/0574/KXL/7f321_0000574239_1.jpg'],
      created_at: '2019-02-03 10:36:29',
    },
    {
      uuid: 'bb',
      title: 'world',
      image: ['https://cdn.jalan.jp/jalan/img/4/kuchikomi/0574/KXL/7f321_0000574239_1.jpg'],
      created_at: '2019-02-03 12:00:00',
    }
  ]
}

class HomeScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Novel',
  })

  componentWillMount () {
    console.log('get home cards.')
  }

  render () {
    return (
      <Container style={styles.container}>
        <Content>
          {data && data.Novel && data.Novel.map(element => (
            <NovelCard
              key={element.uuid}
              uuid={element.uuid}
              title={element.title}
              image={element.image[0]}
              created_at={element.created_at.formatted}
              navigation={this.props.navigation}
            />
          ))}
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
