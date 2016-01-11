import {
  UPDATE_HOMEPAGE_VIEW
} from '../actions/action_types'

let initialState = {
  view: 'index',
  data: {}
}

export default function homepage (state = initialState, action) {

  switch (action.type) {
    case UPDATE_HOMEPAGE_VIEW: {
      return {
        ...state,
        ...action.payload
      }
    }

    default: {
      return state
    }
  }
}
