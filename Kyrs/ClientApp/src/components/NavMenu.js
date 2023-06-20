import React, { Component } from 'react';
import {Button, Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink} from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';
import {Login} from "./Login/Login";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor (props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }

  async onLogout()
  {
    const response = await fetch('auth/logout',{
      method:'POST',
      headers:{'Content-type':'application/json'},
      credentials:'include',
    });
    if(response.ok){
      this.props.handleLogout();
    }
  }
  
  render () {
    let btn;
    if (this.props.loggedInStatus === "LOGGED_IN")
    {
      btn =<div> <ul className="navbar-nav flex-grow">
        <NavItem>
          <Link to ="/UserPage">
            <Button color="light"> Account </Button>
          </Link>
        </NavItem>
        <NavItem>
          <Button color="light" onClick={this.onLogout}> Logout </Button>
        </NavItem>
      </ul>
      </div>
    }
    else if (this.props.loggedInStatus === "NOT_LOGGED_IN")
    {
      btn = <div><NavItem>
          <Login checkLoginStatus={this.props.checkLoginStatus} handleLogin={this.props.handleLogin} />
        </NavItem>
      </div>
    }
    return (
        <header>
          <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
            <Container>
              <NavbarBrand tag={Link} to="/">Bara Holka</NavbarBrand>
              <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
              <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                <ul className="navbar-nav flex-grow">
                  {btn}
                </ul>
              </Collapse>
            </Container>
          </Navbar>
        </header>
    );
  }
}
