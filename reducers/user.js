import { handleActions } from 'redux-actions'
import actions from '../actions/user'

const initialState = { 
  uid: null,
  token: null,
}

const reducer = handleActions({
  [actions.setUserUid]: (state, action) => ({
    ...state,
    uid: action.payload,
  }),
}, initialState)

export default reducer
