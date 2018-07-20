import React from 'react';
import { HashRouter, Route, Redirect } from 'react-router-dom';

import EditScreenWrapper from 'containers/EditScreenWrapper';
import ListScreenWrapper from 'containers/ListScreenWrapper';
import SignUpScreen from 'containers/SignUpScreen';
import StartScreen from 'containers/StartScreen';

class AppRouter extends React.PureComponent {
  _showStartScreen = () => window.location.hash = '/start';
  _showSignUpScreen = () => window.location.hash = '/signup';
  _showAddScreen = () => window.location.hash = '/add';
  _showEditScreen = entryDate => window.location.hash = `/edit/${entryDate}`;
  _showListScreen = () => window.location.hash = '/list';

  _startScreen = props => <StartScreen
    {...props}
    onSignUp={this._showSignUpScreen}
  />

  _signUpScreen = props => <SignUpScreen
    {...props}
    onSignIn={this._showStartScreen}
  />

  _editScreen = props => <EditScreenWrapper
    {...props}
    onBack={this._showListScreen}
    onSave={() => { /* TODO */ }}
  />

  _listScreen = props => <ListScreenWrapper
    {...props}
    onAdd={this._showAddScreen}
    onEdit={this._showEditScreen}
  />;

  render() {
    return (
      <HashRouter>
        <div>
          <Redirect exact path="/" to="/start" />
          <Route exact path="/start" render={this._startScreen} />
          <Route exact path="/signup" render={this._signUpScreen} />
          <Route exact path="/edit" render={this._editScreen} />
          <Route exact path="/edit/:date" render={this._editScreen} />
          <Route exact path="/list" render={this._listScreen} />
        </div>
      </HashRouter>
    );
  }
}

export default AppRouter;
