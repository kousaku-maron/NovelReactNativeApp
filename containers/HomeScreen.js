import { connect } from 'react-redux'
import HomeScreen from '../components/screens/HomeScreen'

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
