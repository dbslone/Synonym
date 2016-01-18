import React, {Component, PropTypes} from 'react'
import {map} from 'lodash'

import {
  Avatar,
  Card,
  CardTitle,
  CardActions,
  FlatButton
} from 'material-ui'

class ConnectionsManager extends Component {

  static propTypes = {
    connections: PropTypes.array,
    deleteConnection: PropTypes.func.isRequired,
    toggleAddConnectionDialog: PropTypes.func.isRequired,
    updateHomepageView: PropTypes.func.isRequired
  }

  static defaultProps = {

  }

  show () {

    return false
  }

  deleteConnection (connectionID) {

    this.props.deleteConnection(connectionID)
  }

  editConnection (connectionID) {

  }

  connect (connectionDetails) {

    this.props.postgresAddConnection(connectionDetails)
    this.props.updateHomepageView({view: 'postgres', connection: connectionDetails})
  }

  renderConnections () {

    let styles = {
      card: {
        minWidth: 300,
        margin: '0 20px 20px 0'
      }
    }

    let connections = map(this.props.connections, (obj, i) => {
      return (
        <Card style={styles.card} zDepth={2} initiallyExpanded={true} key={`card-${i}`}>
          <CardTitle title={obj.nickname} subtitle={obj.address}/>
          <CardActions expandable={true}>
            <FlatButton label={<i className="fa fa-trash"></i>}
              onTouchTap={() => {
                this.deleteConnection(obj.nickname)
              }} />
            <FlatButton label="Edit" secondary={true}
              onTouchTap={() => {
                this.editConnection(obj.nickname)
              }} />
            <FlatButton label="Connect" primary={true}
              onTouchTap={() => {
                this.connect(obj)
              }} />
          </CardActions>
        </Card>
      )
    })

    return connections
  }

  render () {

    let styles = {
      header: {
        color: 'black',
        fontWeight: 100
      },
      addConnection: {
        backgrounColor: 'blue',
        color: 'white'
      },
      addConnectionBtn: {
        padding: '0 0 0 15px'
      },
      flexContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center'
      }
    }

    return (
      <div>
        <h1 style={styles.header}>
          Connections
          <a onClick={this.props.toggleAddConnectionDialog} style={styles.addConnectionBtn}>
            <Avatar backgroundColor="#d50000">+</Avatar>
          </a>
        </h1>

        <div style={styles.flexContainer}>
          {this.renderConnections()}
        </div>

      </div>
    )
  }

}

export default ConnectionsManager
