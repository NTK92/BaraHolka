import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';
import {Footer} from "./Footer";

export class Layout extends Component {
    constructor (props) {
        super(props);
    }
  static displayName = Layout.name;

  render () {
    return (
      <div>
        <NavMenu loggedInStatus={this.props.loggedInStatus} handleLogout = {this.props.handleLogout} 
                 checkLoginStatus={this.props.checkLoginStatus} handleLogin={this.props.handleLogin}/>
        <Container>
          {this.props.children}
        </Container>
              <Footer/>
         
       
      </div>
    );
  }
}
