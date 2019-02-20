import _ from 'lodash'
import React, { Component } from 'react'
import { StyleSheet, View, AsyncStorage } from 'react-native'
import { Button, Text } from 'native-base'
import { DangerZone, AppLoading } from 'expo'
let { Lottie } = DangerZone

class WelcomeScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isInitialized: null
    }
  }

  componentWillMount() {
    let isInitializedString = AsyncStorage.getItem('isInitialized')

    if(isInitializedString === 'true') {
      this.setState({ isInitialized: true })
      this.props.navigation.navigate('Main')
    }
    else {
      this.setState({ isInitialized: false })
    }
  }

  componentDidMount() {
    this.animation.play()
  }

  static navigationOptions = ({ navigation }) => ({
    header: null,
  })

  onStartButtonPress = async () => {
    await AsyncStorage.setItem('isInitialized', 'true')
    this.props.navigation.navigate('Main')
  }

  render () {
    if(_.isNaN(this.state.isInitialized)) {
      return <AppLoading />
    }

    return (
      <View style={styles.content}>
        <View style={styles.lottie}>
          <Lottie
            ref={animation => {
              this.animation = animation
            }}
            style={styles.lottie}
            source={require('../../animations/mappin.json')}
          />
        </View>
        <View style={styles.buttonArea}>
          <Button onPress={this.onStartButtonPress}>
            <Text>Go To App</Text>
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  lottie: {
    width: 300,
    height: 300,
  },
  buttonArea: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default WelcomeScreen
