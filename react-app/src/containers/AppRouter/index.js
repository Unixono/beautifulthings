import React from 'react';
import { HashRouter, Route } from 'react-router-dom';

import EditScreenWrapper from 'containers/EditScreenWrapper';
import ListScreenWrapper from 'containers/ListScreenWrapper';
import SignUpScreen from 'containers/SignUpScreen';
import SplashScreen from 'containers/SplashScreen';
import StartScreen from 'containers/StartScreen';

class AppRouter extends React.PureComponent {
  _showStartScreen = () => window.location.hash = '/start';
  _showSignUpScreen = () => window.location.hash = '/signup';
  _showListScreen = () => window.location.hash = '/list';
  _showAddScreen = () => window.location.hash = '/add';
  _showEditScreen = entryDate => window.location.hash = `/edit/${entryDate}`;

  _getSplashScreen = props => <SplashScreen
    {...props}
    onSignedIn={this._showListScreen}
    onNotSignedIn={this._showStartScreen}
  />

  _getStartScreen = props => <StartScreen
    {...props}
    onSuccessfulySignIn={this._showListScreen}
    onSignUp={this._showSignUpScreen}
  />

  _getSignUpScreen = props => <SignUpScreen
    {...props}
    onSuccessfulySignUp={this._showStartScreen}
    onSignIn={this._showStartScreen}
  />

  _getListScreen = props => <ListScreenWrapper
    {...props}
    onAdd={this._showAddScreen}
    onEdit={this._showEditScreen}
    onSignOut={this._showStartScreen}
  />

  _getEditScreen = props => <EditScreenWrapper
    {...props}
    onBack={this._showListScreen}
    onSave={this._showListScreen}
  />

  render() {
    return (
      <HashRouter>
        <div>
          <Route exact path="/" render={this._getSplashScreen} />
          <Route exact path="/start" render={this._getStartScreen} />
          <Route exact path="/signup" render={this._getSignUpScreen} />
          <Route exact path="/list" render={this._getListScreen} />
          <Route exact path="/add" render={this._getEditScreen} />
          <Route exact path="/edit/:date" render={this._getEditScreen} />
        </div>
      </HashRouter>
    );
  }
}

export default AppRouter;
