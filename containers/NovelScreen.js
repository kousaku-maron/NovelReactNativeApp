import { connect } from 'react-redux'
import NovelScreen from '../components/screens/NovelScreen'

const mapStateToProps = state => {
  return state
}

const mapDispatchToProps = dispatch => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NovelScreen)
