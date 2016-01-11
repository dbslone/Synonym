export default store => next => action => {

  console.log('dispatching', action)
  console.log('store: ', store)
  return next(action)
}
