import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Home from '../components/Home'
import * as DialogActions from '../actions/dialogs'
import * as ConnectionActions from '../actions/connections'
import * as HomepageActions from '../actions/homepage'
import * as PostgresActions from '../actions/postgres'

function mapStateToProps (state) {

  return {
    connections: state.connections,
    dialogs: state.dialogs,
    homepage: state.homepage,
    postgres: state.postgres
  }
}

function mapDispatchToProps (dispatch) {

  return bindActionCreators({
    ...ConnectionActions,
    ...DialogActions,
    ...HomepageActions,
    ...PostgresActions
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
