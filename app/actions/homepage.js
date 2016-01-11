import {
  UPDATE_HOMEPAGE_VIEW
} from './action_types'

export function updateHomepageView (payload) {

  return {
    type: UPDATE_HOMEPAGE_VIEW,
    payload
  }
}
