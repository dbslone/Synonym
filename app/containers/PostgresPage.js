import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import Home from '../components/Home'
import * as DialogActions from '../actions/dialogs'
import * as ConnectionActions from '../actions/connections'

function mapStateToProps (state) {

  return {
    dialogs: state.dialogs,
    connections: state.connections
  }
}

function mapDispatchToProps (dispatch) {

  return bindActionCreators({...DialogActions, ...ConnectionActions}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
