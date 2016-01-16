import {expect} from 'chai'
import connections from '../../app/reducers/connections'
import {
  DELETE_CONNECTION,
  INITIALIZE_CONNECTIONS
} from '../../app/actions/connections'


describe('reducers', () => {
  describe('connections', () => {
    it('should handle initial state', () => {
      expect(connections(undefined, {})).to.equal(0)
    })

    // it('should handle INCREMENT_COUNTER', () => {
    //   expect(counter(1, { type: INCREMENT_COUNTER })).to.equal(2)
    // })
    //
    // it('should handle DECREMENT_COUNTER', () => {
    //   expect(counter(1, { type: DECREMENT_COUNTER })).to.equal(0)
    // })
    //
    // it('should handle unknown action type', () => {
    //   expect(counter(1, { type: 'unknown' })).to.equal(1)
    // })
  })
})
