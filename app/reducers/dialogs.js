import {
  RESET_ADD_CONNECTION_DIALOG,
  TOGGLE_ADD_CONNECTION_DIALOG,
  TOGGLE_LEFT_POPOVER,
  UPDATE_ADD_CONNECTION_FIELD
} from '../actions/action_types'
import {set} from 'lodash'

let initialState = {
  addConnection: false,
  addConnectionForm: {
    address: '',
    database: '',
    nickname: '',
    password: '',
    port: '',
    protocol: 'postgres',
    username: ''
  },
  leftPopover: false
}

export default function dialogs (state = initialState, action) {

  switch (action.type) {
    case TOGGLE_ADD_CONNECTION_DIALOG: {
      return {
        ...state,
        addConnection: !state.addConnection
      }
    }

    case RESET_ADD_CONNECTION_DIALOG: {
      return {
        ...state,
        addConnectionForm: initialState.addConnectionForm
      }
    }

    case TOGGLE_LEFT_POPOVER: {
      return {
        ...state,
        leftPopover: !state.leftPopover
      }
    }

    case UPDATE_ADD_CONNECTION_FIELD: {
      let addConnectionForm = set(state.addConnectionForm, action.payload.field, action.payload.value)

      return {
        ...state,
        addConnectionForm
      }
    }

    default:
      return state
  }
}
