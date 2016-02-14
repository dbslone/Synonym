import React, {Component, PropTypes} from 'react'
import {Table, Column, Cell} from '../flex_table'

class TableView extends Component {

  static propTypes = {
    fetchTable: PropTypes.func.isRequired,
    tableData: PropTypes.array,
    tableName: PropTypes.string.isRequired
  }

  static defaultProps = {
    tableData: []
  }

  componentDidMount () {

    this.props.fetchTable(this.props.tableName)
  }

  renderCells = () => {

    return (
      <Cell>x</Cell>
    )
  }

  render () {

    const styles = {
      color: 'black'
    }

    return (
      <div style={styles} className="tableView">
        <Table>
          <Column>
            <Cell>R1 C1</Cell>
            <Cell>R2 C2</Cell>
          </Column>
          <Column>
            <Cell>R1 C1</Cell>
            <Cell>R2 C2</Cell>
          </Column>
        </Table>
      </div>
    )
  }

}

export default TableView
