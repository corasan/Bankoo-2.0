var React = require('react');
var Firebase = require('firebase');
var Link = require('react-router').Link
var ref = new Firebase('https://bankoo.firebaseio.com/');
var Transactions = require('./transactions');

module.exports = React.createClass({
  render: function() {
    return (
      <SignIn />
    )
  }
});

var SignIn = React.createClass({
  getInitialState: function() {
    var user = ref.getAuth();
    if (!user) {
      return {
        loggedInUser: 'Log in'
      }
    } else {
      return {
        loggedInUser: user.google.displayName
      }
    }
  },
  logOut: function() {
    ref.unauth();
    this.setState({loggedInUser: 'Log in'});
  },
  loginButton: function() {
    var that = this;
    ref.authWithOAuthPopup('google', function(error, authData) {
      ref.child('users').child(authData.uid).once('value', function(data) {
        if(data.exists()) {
          var userData = data.val();
          var name = userData.name;
          console.log('Logged in');
          //render heree
          that.setState({loggedInUser: name});
        } else {
          ref.child('users').child(authData.uid).set({
            provider: authData.provider,
            name: authData.google.displayName,
            email: authData.google.email
          });
          var signedUser = ref.getAuth();
          ref.child('users').child(signedUser.uid).once('value', function(data) {
            var userData = data.val();
            var name = userData.name;
            that.setState({loggedInUser: name});
          });
        }
      });
    }, {
      scope: 'email'
    });
  },
  componentDidMount: function() {
    var that = this;
    var signedUser = ref.getAuth();
    ref.child('users').child(signedUser.uid).once('value', function(data) {
      var userData = data.val();
      var name = userData.name;
      that.setState({loggedInUser: name});
    });
  },
  render: function() {
    var user = ref.getAuth();
    if (!user) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li><a onClick={this.loginButton}>Log in</a></li>
        </ul>
      )
    } else {
      return (
        <div>
          <ul className="nav navbar-nav navbar-left">
            <li><Link to="/">Home</Link></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to="/transactions">Transactions</Link></li>
            <li><a>{this.state.loggedInUser}</a></li>
            <li><a onClick={this.logOut}>Log out</a></li>
          </ul>
        </div>
      )
    }
  }
});

// <li><a href="#" onClick={this.logOut}>Log out</a></li>
