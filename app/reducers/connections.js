import {
  INITIALIZE_CONNECTIONS
} from '../actions/action_types'

let initialState = []

export default function connections (state = initialState, action) {

  switch (action.type) {

    case INITIALIZE_CONNECTIONS: {
      return action.payload
    }

    default: {
      return state
    }
  }
}
