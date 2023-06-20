import React, { Component } from 'react';
import { Layout } from './components/Layout';
import { Home } from './components/HomeView/Home';
import './custom.css'
import {UserPage} from "./components/UserPage/UserPage";
import { Provider } from 'react-redux';
import store from './components/Login/store';
import {GetUserID} from "./components/UserPage/GetUserID";
import {Login} from "./components/Login/Login";
import ProductT from "./components/ProductView/Product";
import {Route} from "react-router";


export default class App extends Component {
  static displayName = App.name;
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }
  async checkLoginStatus() {
    const response = await fetch('/auth/user',{
      method:'GET',
      headers:{'Content-type':'application/json'},
      credentials:'include'
    });
    const user = await response.json();

    if(response.ok)
    {
      this.setState({
        loggedInStatus: "LOGGED_IN",
        user: user
      });
    }
    else{
      this.setState({
        loggedInStatus: "NOT_LOGGED_IN",
        user: {}
      });
    }
  }
  async componentDidMount() {
    try {
      await this.checkLoginStatus();
    }
    catch (e) {
      console.log("server not responding")
    }
  }

  handleLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    });
    this.forceUpdate();
  }

  
  handleLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: this.state.user
    });
    this.forceUpdate();
    
  }
  
  render () {
    return (
          <Layout handleLogout={this.handleLogout} loggedInStatus={this.state.loggedInStatus} checkLoginStatus={this.checkLoginStatus} handleLogin={this.handleLogin}>
            <Route exact path='/' render={ () => (
                <Home user={this.state.user} loggedInStatus={this.state.loggedInStatus}/>
            )}/>
            
            <Route path='/auth' render={ () => (
                <Login user={this.state.user} loggedInStatus={this.state.loggedInStatus} checkLoginStatus={this.checkLoginStatus} handleLogin={this.handleLogin}/>
            )}/>

            <Route path="/product/:id" render={() => (
                <ProductT
                    user={this.state.user}
                    loggedInStatus={this.state.loggedInStatus}
                />
            )}/>

            <Route path="/user/:id" element={GetUserID}/>

            <Route exact path='/UserPage'
                   render={props => (
                       <UserPage
                           user={this.state.user}
                           loggedInStatus={this.state.loggedInStatus}
                       />
                   )}/>

            <Route path="*" element={<h2> Ресурс не найден </h2>}/>
            
          </Layout>
    );
  }
}
