import React, { Component } from 'react';
import { logout } from '../services/authService';
import auth from '../services/authService';

class Logout extends Component {

  componentDidMount() {
    // can also do auth.logout();
    logout();

    window.location = '/';
  }

  render() { 
    return null;
  }
}
 
export default Logout;