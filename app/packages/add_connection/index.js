import React, {Component, PropTypes} from 'react'
import {
  Dialog,
  DropDownMenu,
  FlatButton,
  MenuItem,
  TextField
} from 'material-ui'
import {map} from 'lodash'

class AddConnectionDialog extends Component {

  static propTypes = {
    create: PropTypes.func,
    form: PropTypes.shape({
      address: PropTypes.string,
      protocol: PropTypes.string
    }),
    onRequestClose: PropTypes.func,
    open: PropTypes.bool,
    updateAddConnectionField: PropTypes.func.isRequired
  }

  static defaultProps = {
    form: {
      address: ''
    },
    open: false,
    onRequestClose () {},
    create () {}
  }

  updateField = (field, value) => {

    this.props.updateAddConnectionField({field, value})
  }

  updateDatabaseType = (event, selectedIndex, menuItem) => {

    this.props.updateAddConnectionField({field: 'protocol', value: menuItem})
  }

  renderDatabaseConnectionTypes () {

    let menuItems = [
      {payload: 'mysql', text: 'MySQL'},
      {payload: 'postgres', text: 'PostgreSQL'},
      {payload: 'redis', text: 'Redis'},
      {payload: 'sqlite', text: 'SQLite'}
    ]

    return map(menuItems, obj => <MenuItem value={obj.payload} primaryText={obj.text} />)
  }

  renderTextFields () {

    let fields = [
      {label: 'Nickname', id: 'nickname'},
      {label: 'Server Address', id: 'address'},
      {label: 'Database', id: 'database'},
      {label: 'Username', id: 'username'},
      {label: 'Password', id: 'password'},
      {label: 'Port', id: 'port'}
    ]

    let styles = {
      textField: {
        width: '100%'
      }
    }

    return map(fields, (field) =>
      <TextField
        key={field.label}
        floatingLabelText={field.label}
        value={this.props.form[field.id]}
        style={styles.textField}
        onChange={(e) => this.updateField(field.id, e.target.value)} />
    )
  }

  renderFormFields () {

    let styles = {
      container: {
        width: '90%',
        margin: '0 auto'
      }
    }

    return (
      <div style={styles.container}>
        <DropDownMenu value={this.props.form.protocol}
          onChange={this.updateDatabaseType.bind(this)}
        >
          {this.renderDatabaseConnectionTypes()}
        </DropDownMenu>
        {this.renderTextFields()}
      </div>
    )
  }

  render () {

    const standardActions = [
      <FlatButton
        label="Cancel"
        secondary={true}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        onTouchTap={this.props.create} />
    ]

    return (
      <Dialog
        title="Add Connection"
        actions={standardActions}
        style={{height: 800}}
        open={this.props.open}
        onRequestClose={this.props.onRequestClose}>
        {this.renderFormFields()}
      </Dialog>
    )
  }

}

export default AddConnectionDialog
