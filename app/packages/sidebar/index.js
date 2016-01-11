import React, {Component, PropTypes} from 'react'
import styles from './sidebar.module.css'

class Sidebar extends Component {

  static propTypes = {
    sequelize: PropTypes.func
  }

  addConnection () {

  }

  render () {

    return (
      <div className={styles.container}>
        <a onClick={() => this.addConnection()}>ADD CONN</a>
      </div>
    )
  }
}

export default Sidebar
