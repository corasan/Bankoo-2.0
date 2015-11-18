var React = require('react');
var Firebase = require('firebase');
var ref = new Firebase('https://bankoo.firebaseio.com/');
var isNewUser = true;

function saveData() {
  ref.onAuth(function(authData) {
    if (authData && isNewUser) {
      ref.child('users').child(authData.uid).set({
        provider: authData.provider,
        name: authData.google.displayName,
        email: authData.google.email
      });
    }
  });
}

module.exports = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <ul className="nav navbar-nav navbar-right">
            <LoginComponent />
          </ul>
        </div>
      </nav>
    )
  }
});

var LoginComponent = React.createClass({
  handleClick: function() {
    ref.authWithOAuthPopup("google", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    }, {
      scope: 'email'
    });
    saveData();
  },
  render: function() {
    return (
      <li><a href="#" onClick={this.handleClick}>Login</a></li>
    )
  }
});
