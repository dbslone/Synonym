import React, {Component, PropTypes} from 'react'
import DevTools from './DevTools'

export default class App extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  static contextTypes = {
    router: PropTypes.func.isRequired
  }

  transitioning = false

  transitionTo = () => {

    let state = store.getState()
    console.log("STATE", state)
  }

  render () {

    return (
      <div>
        {this.props.children}
        <DevTools />
      </div>
    )
  }
}




// const __DEV__ = process.env.NODE_ENV !== 'production'
//   && process.env.NODE_ENV !== 'test'
//
// class Root extends Component {
//
//   static propTypes = {
//     history: PropTypes.object.isRequired,
//     railsOptions: PropTypes.object
//   }
//
//   static defaultProps = {
//     railsOptions: {}
//   }
//
//   static contextTypes = {
//     router: PropTypes.func.isRequired
//   }
//
//   transitioning = false
//
//   // Handle dispatched route transitions
//   transitionTo = () => {
//
//     let state = store.getState()
//     let transition = get(state, 'router.transitionTo') || {}
//
//     if (!isEmpty(transition) && !this.transitioning) {
//       this.transitioning = true
//       store.dispatch(actions.clearTransitionTo())
//       defer(() => this.context.router.transitionTo(transition.to, transition.params, transition.query))
//     }
//     else {
//       this.transitioning = false
//     }
//   }
//
//   componentWillMount () {
//
//     let projectId = this.context.router.getCurrentParams().projectId
//
//     store.dispatch(actions.setCurrentProjectId(projectId))
//
//     if (projectId) {
//       store.dispatch(actions.requestSubmissionProject(projectId))
//       store.dispatch(actions.requestActivities())
//     }
//   }
//
//   componentDidMount () {
//
//     store.dispatch(actions.updateRoute(this.props.routeState))
//
//     // Handle dispatched route transitions
//     store.subscribe(this.transitionTo)
//
//     // Only need to put experiments into the store once
//     let {
//       experiments,
//       imageUrls,
//       isUserStyleResultPage,
//       privateDesigner,
//       roomTypes,
//       users,
//       initialSelectedRooms
//     } = this.props.railsOptions
//
//     store.dispatch(actions.addExperiments(experiments))
//     store.dispatch(actions.addRoomTypes(roomTypes))
//
//     if (isUserStyleResultPage) {
//       store.dispatch(actions.addUsers(users))
//       store.dispatch(actions.addStyleQuizImages(imageUrls))
//       store.dispatch(actions.addPrivateDesigner(privateDesigner))
//       store.dispatch(actions.addStyleQuizResultInitialSelectedRooms(initialSelectedRooms))
//     }
//   }
//
//   componentWillUpdate (nextProps) {
//
//     if (!isEqual(nextProps.routeState, this.props.routeState)) {
//       store.dispatch(actions.updateRoute(nextProps.routeState))
//     }
//   }
//
//   renderAppContainer = () => {
//
//     let actionCreators = bindActionCreators(actions, store.dispatch)
//     return <AppContainer railsOptions={this.props.railsOptions} {...actionCreators} />
//   }
//
//   render () {
//
//     return (
//       <div>
//         <Provider store={store}>
//           {this.renderAppContainer}
//         </Provider>
//       </div>
//     )
//   }
// }
//
// export default Root
