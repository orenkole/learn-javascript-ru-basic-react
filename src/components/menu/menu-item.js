import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'

class MenuItem extends Component {
  render() {
    const { children, path } = this.props
    return (
      <div>
        <NavLink to={path} activeStyle={{ color: 'red' }}>
          {children}
        </NavLink>
      </div>
    )
  }
}

export default MenuItem
