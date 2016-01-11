import React, {Component, PropTypes} from 'react'
import {
  AppBar,
  LeftNav
} from 'material-ui'

import {
  AddConnectionDialog,
  ConnectionsManager,
  PostgresView
} from '../packages'

let fs = require('fs')

let injectTapEventPlugin = require('react-tap-event-plugin')
injectTapEventPlugin()

export default class Home extends Component {

  static propTypes = {
    connections: PropTypes.array,
    createNewConnection: PropTypes.func.isRequired,
    deleteConnection: PropTypes.func.isRequired,
    dialogs: PropTypes.shape({
      addConnection: PropTypes.bool,
      addConnectionForm: PropTypes.object,
      leftPopover: PropTypes.bool,
      leftPopoverEl: PropTypes.object
    }),
    homepage: PropTypes.shape({
      connection: PropTypes.object,
      data: PropTypes.object,
      view: PropTypes.string
    }),
    initializeConnections: PropTypes.func.isRequired,
    postgres: PropTypes.shape({
      databases: PropTypes.array
    }),
    postgresAddTables: PropTypes.func.isRequired,
    toggleAddConnectionDialog: PropTypes.func.isRequired,
    toggleLeftPopover: PropTypes.func.isRequired,
    updateAddConnectionField: PropTypes.func.isRequired,
    updateHomepageView: PropTypes.func.isRequired
  }

  _onLeftIconButtonTouchTap () {

    this.refs.leftNav.toggle()
  }

  createConnection () {

    let data = this.props.dialogs.addConnectionForm
    this.props.createNewConnection(data)
  }

  componentDidMount () {

    try {
      this.props.initializeConnections(JSON.parse(fs.readFileSync('databases.json', {encoding: 'utf8'})))
    }
    catch (err) {
      this.props.initializeConnections([])
    }
  }

  renderConnectionManager () {

    let {
      connections,
      deleteConnection,
      toggleAddConnectionDialog,
      updateHomepageView
    } = this.props

    return (
      <ConnectionsManager
        connections={connections}
        toggleAddConnectionDialog={toggleAddConnectionDialog}
        deleteConnection={deleteConnection}
        updateHomepageView={updateHomepageView.bind(this)} />
    )
  }

  renderPostgresViewer () {

    let {
      homepage,
      postgres,
      postgresAddTables
    } = this.props

    return (
      <div>
        <PostgresView
          addTables={postgresAddTables.bind(this)}
          databases={postgres}
          connection={homepage.connection}
        />
      </div>
    )
  }

  render () {

    let menuItems = [
      {
        route: 'get-started',
        text: 'Get Started'
      },
      {
        route: 'customization',
        text: 'Customization'
      }
    ]

    let {
      dialogs,
      toggleAddConnectionDialog,
      updateAddConnectionField
    } = this.props

    return (
      <div>
        <LeftNav ref="leftNav" menuItems={menuItems} docked={false} />
        <AppBar title="Synonym"
          onLeftIconButtonTouchTap={this._onLeftIconButtonTouchTap.bind(this)} />

        {this.props.homepage.view === 'index'
          ? this.renderConnectionManager()
          : this.renderPostgresViewer()
        }

        <AddConnectionDialog
          form={dialogs.addConnectionForm}
          updateAddConnectionField={updateAddConnectionField.bind(this)}
          open={dialogs.addConnection}
          create={this.createConnection.bind(this)}
          onRequestClose={toggleAddConnectionDialog} />
      </div>
    )
  }
}
