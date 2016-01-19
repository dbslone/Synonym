import React, {Component, PropTypes} from 'react'
import {Tabs,
  Tab,
  Paper,
  TextField,
  RaisedButton
} from 'material-ui'
import {map} from 'lodash'

import Performance from './performance'

class PostgresView extends Component {

  static propTypes = {
    addConnection: PropTypes.func.isRequired,
    connection: PropTypes.object,
    connectionSettings: PropTypes.object,
    databases: PropTypes.object.isRequired,
    getPerformanceResults: PropTypes.func.isRequired,
    listTables: PropTypes.func.isRequired,
    performance: PropTypes.array
  }

  static defaultProps = {
    performance: []
  }

  loadTable (tableName) {

    return (
      <div>{tableName}</div>
    )
  }

  componentDidMount () {

    this.props.listTables()
  }

  renderTables (tables) {

    let styles = {
      container: {
        width: 120,
        margin: '20px 10px 0 0',
        padding: 10,
        float: 'left',
        textAlign: 'center'
      },
      icon: {
        fontSize: 30
      },
      label: {
         textOverflow: 'ellipsis',
         margin: '0 2px',
         whiteSpace: 'nowrap',
         overflow: 'hidden',
         fontSize: 13
      }
    }

    return map(tables, (t) => {

      return (
        <Paper style={styles.container} zDepth={2} key={t.table_name} onClick={() => this.loadTable()}>
          <i style={styles.icon} className="fa fa-table"></i>
          <div style={styles.label}>{t.table_name}</div>
        </Paper>
      )
    })
  }

  renderDatabases () {

    let styles = {
      container: {
        color: 'black'
      },
      label: {
        padding: '10px 0 10px 0',
        fontSize: 20,
        fontWeight: 100
      }
    }

    let databases = map(this.props.databases, (tables, databaseName) => {

      return (
        <div style={styles.container} key={databaseName}>
          <div style={styles.label}>{databaseName}</div>
          {this.renderTables(tables)}
        </div>
      )
    })

    return databases
  }

  render () {

    let styles = {
      base: {
        color: 'black'
      },
      sql: {
        width: '100%'
      },
      btn: {
        float: 'right'
      }
    }

    let {
      addConnection,
      getPerformanceResults,
      performance
    } = this.props

    return (
      <div style={styles.base}>
        <Tabs>
          <Tab label="Tables">
          {this.renderDatabases()}
          </Tab>
          <Tab label="SQL">
            <div>
              <TextField multiLine={true} style={styles.sql} />
              <div style={styles.btn}><RaisedButton label="Execute Query" primary={true} /></div>

              <div>
              EXECUTED QUERY GOES HERE
              </div>
            </div>
          </Tab>
          <Tab label="DB Performance">
            <div>
              <Performance
                addConnection={addConnection}
                getPerformanceResults={getPerformanceResults}
                performance={performance}
              />
            </div>
          </Tab>
        </Tabs>
      </div>
    )
  }

}

export default PostgresView
