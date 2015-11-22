var React = require('react');
var Firebase = require('firebase');
var Link = require('react-router').Link
var Navbar = require('react-bootstrap/lib').Navbar;
var Nav = require('react-bootstrap/lib').Nav;
var NavItem = require('react-bootstrap/lib').NavItem;
var LinkContainer = require('react-router-bootstrap').LinkContainer;
var ref = new Firebase('https://bankoo.firebaseio.com/');

module.exports = React.createClass({
  getInitialState () {
    var user = ref.getAuth();
    if (user) {
      return {loggedInUser: user.google.displayName}
    } else {
      return {loggedInUser: 'Log in'}
    }
  },
  logOut () {
    ref.unauth();
    this.setState({loggedInUser: 'Log in'});
  },
  loginButton () {
    var that = this;
    ref.authWithOAuthPopup('google', function(error, authData) {
      ref.child('users').child(authData.uid).once('value', function(data) {
        if (data.exists()) {
          var userData = data.val();
          var name = userData.name;
          console.log('Logged in');
          that.setState({loggedInUser: name});
        } else {
          ref.child('users').child(authData.uid).set({
            provider: authData.provider,
            name: authData.google.displayName,
            email: authData.google.email,
            balance: 0
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
  componentDidMount () {
    var that = this;
    var signedUser = ref.getAuth();
    ref.child('users').child(signedUser.uid).once('value', function(data) {
      var userData = data.val();
      var name = userData.name;
      that.setState({loggedInUser: name});
    });
  },
  render () {
    var user = ref.getAuth();
    if (!user) {
      return (
        <Navbar.Collapse>
          <Nav pullRight>
            <li>
              <a onClick={this.loginButton}>Log in</a>
            </li>
          </Nav>
        </Navbar.Collapse>
      )
    } else {
      return (
        <div>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/">Home</Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <li>
                <Link to="/transactions">Transactions</Link>
              </li>
              <NavItem>{this.state.loggedInUser}</NavItem>
              <NavItem onClick={this.logOut}>Log out</NavItem>
            </Nav>
          </Navbar.Collapse>
        </div>
      )
    }
  }
});
