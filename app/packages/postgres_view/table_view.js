import React, {Component, PropTypes} from 'react'
import {Table, Column, Cell} from 'fixed-data-table'

const TextCell = ({rowIndex, data, columnKey, ...props}) => (
  <Cell {...props}>
    {data.getObjectAt(rowIndex)[columnKey]}
  </Cell>
)

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

    const dataList = ['test1','test2']

    return (
      <div style={styles} className="tableView">
      <Table
        rowHeight={30}
        headerHeight={50}
        rowsCount={5}
        onColumnResizeEndCallback={() => {}}
        isColumnResizing={false}
        width={1000}
        height={500}
        {...this.props}>
        <Column
          columnKey="firstName"
          header={<Cell>First Name</Cell>}
          cell={<Cell>Column 1</Cell>}
          fixed={true}
          width={100}
          isResizable={true}
        />
        <Column
          columnKey="lastName"
          header={<Cell>Last Name (min/max constrained)</Cell>}
          cell={<Cell>Column 1</Cell>}
          width={100}
          isResizable={true}
          minWidth={70}
          maxWidth={170}
        />
        <Column
          columnKey="companyName"
          header={<Cell>Company</Cell>}
          cell={<Cell>Column 1</Cell>}
          width={100}
          isResizable={true}
        />
        <Column
          columnKey="sentence"
          header={<Cell>Sentence</Cell>}
          cell={<Cell>Column 1</Cell>}
          width={100}
          isResizable={true}
        />
      </Table>

      </div>
    )
  }

}

export default TableView
