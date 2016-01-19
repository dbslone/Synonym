import React, {Component, PropTypes} from 'react'
import {map, padStart} from 'lodash'

import Table from 'material-ui/lib/table/table'
import TableBody from 'material-ui/lib/table/table-body'
import TableFooter from 'material-ui/lib/table/table-footer'
import TableHeader from 'material-ui/lib/table/table-header'
import TableHeaderColumn from 'material-ui/lib/table/table-header-column'
import TableRow from 'material-ui/lib/table/table-row'
import TableRowColumn from 'material-ui/lib/table/table-row-column'

class Performance extends Component {

  static propTypes = {
    getPerformanceResults: PropTypes.func.isRequired,
    performance: PropTypes.array
  }

  static defaultProps = {
    performance: []
  }

  componentDidMount () {

    this.props.getPerformanceResults()
  }

  renderResults () {

    let results = map(this.props.performance, (row) => {

      return (
        <TableRow selected={true}>
          <TableRowColumn>{row.datname}</TableRowColumn>
          <TableRowColumn>{row.query}</TableRowColumn>
          <TableRowColumn>{padStart(row.duration.minutes, 2)}:{padStart(row.duration.seconds, 2)}</TableRowColumn>
        </TableRow>
      )
    })

    return results
  }

  render () {

    let tableprops = {
      fixedHeader: true,
      fixedFooter: true,
      stripedRows: false,
      showRowHover: false,
      selectable: true,
      multiSelectable: false,
      enableSelectAll: false,
      deselectOnClickaway: true,
      height: '300px'
    }

    return (
      <Table
        fixedHeader={tableprops.fixedHeader}
        fixedFooter={tableprops.fixedFooter}
        onRowSelection={this._onRowSelection}>
        <TableBody
          displayRowCheckbox={false}
          deselectOnClickaway={tableprops.deselectOnClickaway}
          showRowHover={tableprops.showRowHover}
        >
          {this.renderResults()}
        </TableBody>
        <TableFooter>
          <TableRow>Show More</TableRow>
        </TableFooter>
      </Table>
    )
  }

}

export default Performance
