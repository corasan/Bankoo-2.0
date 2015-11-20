var React = require('react');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
var ref = new Firebase('https://bankoo.firebaseio.com/');

module.exports = React.createClass({
  render: function() {
    return (
      <SignIn />
    )
  }
});

var SignIn = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return {
      loggedInUser: 'Log in'
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
          var signedUpRef = ref.getAuth();
          ref.child('users').child(signedUpRef.uid).once('value', function(data) {
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

  render: function() {
    var user = ref.getAuth();
    if (!user) {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#" onClick={this.loginButton}>Log in</a></li>
        </ul>
      )
    } else {
      return (
        <ul className="nav navbar-nav navbar-right">
          <li><a href="#" onClick={this.loginButton}>{this.state.loggedInUser}</a></li>
          <li><a href="#" onClick={this.logOut}>Log out</a></li>
        </ul>
      )
    }
  }
});

// {(() => {
//   if (user) {
//     <li><a href="#" onClick={this.logOut}>Log out</a></li>
//   }
// })()}
