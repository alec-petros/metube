import React from 'react';

class NavBar extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-fixed-top navbar-dark bg-dark">
        <a className="navbar-brand" href="/">MeTube</a>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
              </li>
              { this.props.auth ?
                <li className="nav-item">
                  <a className="nav-link" href="/upload">Upload</a>
                </li> :
                <li className="nav-item">
                  <a className="nav-link disabled" href="/">Upload</a>
                </li>
               }
              { this.props.auth ?
                <li className="nav-item">
                  <a onClick={ this.props.logout } className="nav-link" href="/">Logout</a>
                </li> :
                <li className="nav-item">
                  <a className="nav-link" href="/login">Login</a>
                </li>
              }
              { !this.props.auth ?
                <li className="nav-item">
                  <a className="nav-link" href="/register">Register</a>
                </li> :
                null
               }
            </ul>
            <form className="form-inline my-2 my-lg-0" >
              <input className="form-control mr-sm-2" type="search" onChange={this.props.handleChange} value={this.props.search} placeholder="Search" aria-label="Search" />
            </form>
          </div>
      </nav>
    )
  }
}

export default NavBar
