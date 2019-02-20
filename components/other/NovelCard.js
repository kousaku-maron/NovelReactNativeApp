import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Dimensions, Image } from 'react-native'
import { Card, CardItem, Body, Text } from 'native-base'
import Colors from '../../constants/Colors'

const NovelCard = ({ uuid, title, image, created_at, navigation }) => (
  <Card style={styles.card}>
    <CardItem cardBody button onPress={() => navigation.navigate('Novel', { uuid: uuid })}>
      <Image
        style={styles.image}
        source={{uri: image}}
      />
    </CardItem>
    <CardItem style={styles.inner} button onPress={() => navigation.navigate('Novel', { uuid: uuid })}>
      <Body>
        <Text>{title}</Text>
        <Text style={styles.date}>{created_at}</Text>
      </Body>
    </CardItem>
  </Card>
)

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  card: {
    width: width,
    height: 300,
  },
  image: {
    width: width,
    height: 200,
    overflow: 'hidden',
  },
  date: {
    position: 'absolute',
    top: 50,
    left: 0,
    color: Colors.text.primary.light,
    fontSize: 10.5,
  },
})

export default NovelCard
