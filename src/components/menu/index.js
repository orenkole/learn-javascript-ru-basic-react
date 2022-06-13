import React, { Component } from 'react'
import MenuItem from './menu-item'

class Menu extends Component {
  render() {
    return (
      <div>
        <h3>Main Menu</h3>
        {this.props.children}
      </div>
    )
  }
}

export { MenuItem }
export default Menu
