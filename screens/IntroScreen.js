import React, { Component } from 'react'
import * as firebase from 'firebase'

import IntroComponent from '../components/IntroComponent'

class IntroScreen extends Component {
  render () {
    return (
      <IntroComponent
        navigate={this.props.navigation.navigate}
        loginGoogle={this.props.userLoginGoogle}
        loginFacebook={this.props.userLoginFacebook}
      />
    )
  }
}

export default IntroScreen