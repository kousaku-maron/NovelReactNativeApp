import * as React from 'react'
import { StyleSheet } from 'react-native'
import { Dimensions, View } from 'react-native'
import { Text, Button } from 'native-base'
import { Icon } from 'expo'
import { authFacebook, authGoogle, logout } from '../../modules/firebase'

const LoginBlock = props => (
  <View style={styles.block}>
    <Button
      style={styles.facebookColor}
      block
      light
      onPress={authFacebook}
    >
      <Icon.Entypo
        name='facebook'
        size={26}
        color={styles.whiteFontColor.color}
      />
      <Text style={styles.whiteFontColor}>Login With Facebook</Text>
    </Button>
    <Button
      style={styles.googleColor}
      block
      light
      onPress={authGoogle}
    >
      <Icon.AntDesign
        name='google'
        size={26}
        color={styles.whiteFontColor.color}
      />
      <Text style={styles.whiteFontColor}>Login With Google</Text>
    </Button>
    <Button
      style={styles.logout}
      transparent
      dark
      onPress={logout}
    >
      <Text style={styles.logoutText}>Logout</Text>
    </Button>
  </View>
)

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  block: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: width/4 * 3,
    padding: 12,
    height: 180,
  },
  facebookColor: {
    backgroundColor: '#3B5998',
  },
  googleColor: {
    backgroundColor: '#DB4437',
  },
  logout: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  logoutText: {
    fontSize: 12,
  },
  whiteFontColor: {
    color: 'white',
  },
})

export default LoginBlock
