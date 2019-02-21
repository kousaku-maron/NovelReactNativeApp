import { connect } from 'react-redux'
import userActions from '../actions/user'
import ProfileEditScreen from '../components/screens/ProfileEditScreen'

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {
    handleSetUserProperties: (properties) => dispatch(userActions.setUserProperties(properties)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEditScreen)
