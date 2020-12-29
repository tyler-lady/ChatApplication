import React from 'react';
import { BrowserRouter, Switch, Route, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ChatActions from './store/actions/chatActions';
import * as AuthActions from './store/actions/authActions';
import Auth from './components/pages/Auth';
import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/swag.css';
import Messenger from './components/pages/Messenger';

class App extends React.Component{
  
  componentDidMount(){
    this.props.setupSocket();
  }

  render(){
    return (
      <div className="App">
        <button onClick={e => {
          this.props.logout();
        }}>Logout</button>
        <BrowserRouter>
          <Switch>
            <Route
              path='/login'
              render={props => {
                if(this.props.token){
                  return (
                    <Redirect to="/" />
                  )
                } else {
                  return (
                    <Auth />
                  )
                }
              }}
            />
            <Route
              path='/signup'
              render={props => {
                if(this.props.token){
                  return (
                    <Redirect to="/" />
                  )
                } else {
                  return (
                    <Auth />
                  )
                }
              }}
            />
            <Route
              path='/:threadId'
              render={props => {
                if(!this.props.token){
                  return (
                    <Redirect to='/login' />
                  )
                } else {
                  return (
                    <Messenger />
                  )
                }
              }}
            />
            <Route
              path='/'
              render={props => {
                if(!this.props.token){
                  return (
                    <Redirect to='/login' />
                  )
                } else {
                  return (
                    <Messenger />
                  )
                }
              }}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }  
}

const mapStateToProps = state => ({
  ...state.auth,
  ...state.chat
})

const mapDispatchToProps = dispatch => ({
  setupSocket: () => {
    dispatch(ChatActions.setupSocket());
  },
  logout: () => {
    dispatch(AuthActions.logout());
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);