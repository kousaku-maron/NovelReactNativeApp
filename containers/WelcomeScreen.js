import { connect } from 'react-redux'
import WelcomeScreen from '../components/screens/WelcomeScreen'

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeScreen)
