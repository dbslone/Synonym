/* eslint no-unused-expressions: 0 */

import {expect} from 'chai'
import {spy} from 'sinon'
import * as actions from '../../app/actions/connections'


describe('actions', () => {
  it('should create initialize connections action', () => {
    console.log('actions: ', actions)
    console.log('aa: ', actions.initializeConnections({}).to.deep)
    console.log("============")
    expect(actions.initializeConnections({})).to.deep.equal({type: actions.INITIALIZE_CONNECTIONS})
  })

  it('should create delete connection action', () => {
    expect(actions.deleteConnection()).to.deep.equal({type: actions.DELETE_CONNECTION})
  })

  // it('incrementIfOdd should create increment action', () => {
  //   const fn = actions.incrementIfOdd()
  //   expect(fn).to.be.a('function')
  //   const dispatch = spy()
  //   const getState = () => ({ counter: 1 })
  //   fn(dispatch, getState)
  //   expect(dispatch.calledWith({ type: actions.INCREMENT_COUNTER })).to.be.true
  // })
  //
  // it('incrementIfOdd shouldnt create increment action if counter is even', () => {
  //   const fn = actions.incrementIfOdd()
  //   const dispatch = spy()
  //   const getState = () => ({ counter: 2 })
  //   fn(dispatch, getState)
  //   expect(dispatch.called).to.be.false
  // })
  //
  // // There's no nice way to test this at the moment...
  // it('incrementAsync', (done) => {
  //   const fn = actions.incrementAsync(1)
  //   expect(fn).to.be.a('function')
  //   const dispatch = spy()
  //   fn(dispatch)
  //   setTimeout(() => {
  //     expect(dispatch.calledWith({ type: actions.INCREMENT_COUNTER })).to.be.true
  //     done()
  //   }, 5)
  // })
})
