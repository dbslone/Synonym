import React, {Component, PropTypes} from 'react'
import {Dialog, TextField, DropDownMenu} from 'material-ui'
import {map} from 'lodash'

class AddConnectionDialog extends Component {

  static propTypes = {
    create: PropTypes.func,
    form: PropTypes.shape({
      address: PropTypes.string
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

  renderFormFields () {

    let styles = {
      container: {
        width: '90%',
        margin: '0 auto'
      },
      textField: {
        width: '100%'
      }
    }

    let fields = [
      {label: 'Nickname', id: 'nickname'},
      {label: 'Server Address', id: 'address'},
      {label: 'Database', id: 'database'},
      {label: 'Username', id: 'username'},
      {label: 'Password', id: 'password'},
      {label: 'Port', id: 'port'}
    ]

    let menuItems = [
      {payload: 'mysql', text: 'MySQL'},
      {payload: 'postgres', text: 'PostgreSQL'},
      {payload: 'redis', text: 'Redis'},
      {payload: 'sqlite', text: 'SQLite'}
    ]

    let textFields = map(fields, (field) =>
      <TextField
        key={field.label}
        floatingLabelText={field.label}
        value={this.props.form[field.id]}
        style={styles.textField}
        onChange={(e) => this.updateField(field.id, e.target.value)} />
    )

    return (
      <div style={styles.container}>
        <DropDownMenu
          menuItems={menuItems}
          onChange={this.updateDatabaseType.bind(this)}
        />
        {textFields}
      </div>
    )
  }

  render () {

    let standardActions = [
      {text: 'Cancel'},
      {text: 'Submit', onTouchTap: this.props.create, ref: 'submit'}
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
