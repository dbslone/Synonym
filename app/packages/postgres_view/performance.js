import React, {Component, PropTypes} from 'react'
import {map, padStart} from 'lodash'

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

  // renderResults () {
  //
  //   let results = map(this.props.performance, (row) => {
  //
  //     return (
  //       <TableRow selected={true}>
  //         <TableRowColumn>{row.datname}</TableRowColumn>
  //         <TableRowColumn>{row.query}</TableRowColumn>
  //         <TableRowColumn>{padStart(row.duration.minutes, 2, '0')}:{padStart(row.duration.seconds, 2)}</TableRowColumn>
  //       </TableRow>
  //     )
  //   })
  //
  //   return results
  // }

  render () {

    let dataList = [
      ['col 1', 'col2', 'col3'],
      ['col 1', 'col2', 'col3']
    ]

    return (
      <div>
        Performance
      </div>
    )
  }
}

export default Performance
