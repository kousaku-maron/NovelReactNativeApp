import { connect } from 'react-redux'
import userActions from '../actions/user'
import ProfileScreen from '../components/screens/ProfileScreen'

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    handleSetUserProperties: (properties) => dispatch(userActions.setUserProperties(properties)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
