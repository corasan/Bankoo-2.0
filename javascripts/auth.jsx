var React = require('react');
var Firebase = require('firebase');
var Link = require('react-router').Link
var Navbar = require('react-bootstrap/lib').Navbar;
var Nav = require('react-bootstrap/lib').Nav;
var NavItem = require('react-bootstrap/lib').NavItem;
var NavDropdown = require('react-bootstrap/lib').NavDropdown;
var MenuItem = require('react-bootstrap/lib').MenuItem;
var LinkContainer = require('react-router-bootstrap').LinkContainer;
var ref = new Firebase('https://bankoo.firebaseio.com/');
var UserHome = require('./user-home');

module.exports = React.createClass({
  getInitialState () {
    var user = ref.getAuth();
    if (user) {
      return {loggedInUser: user.google.displayName, balance: null}
    } else {
      return {loggedInUser: ''}
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
          ref.child('users').child(authData.uid).set({provider: authData.provider, name: authData.google.displayName, email: authData.google.email, balance: 0});
          var signedUser = ref.getAuth();
          ref.child('users').child(signedUser.uid).once('value', function(data) {
            var userData = data.val();
            var name = userData.name;
            that.setState({loggedInUser: name});
          });
          console.log('Signed Up');
        }
      });
    }, {
      scope: 'email'
    });
    return (
      <UserHome/>
    )
  },
  componentDidMount () {
    var signedUser = ref.getAuth();
    ref.child('users').child(signedUser.uid).on('value', function(data) {
      var userData = data.val();
      this.setState({loggedInUser: userData.name, balance: userData.balance.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')});
    }.bind(this));
  },
  render () {
    var user = ref.getAuth();
    if (!user) {
      return (
        <Navbar.Collapse>
          <Nav pullRight>
            <li>
              <a href="#" onClick={this.loginButton} id="login">Log in</a>
            </li>
          </Nav>
        </Navbar.Collapse>
      )
    } else {
      return (
        <div>
          <Navbar.Header>
            <Navbar.Brand>
              <Link to="/home">Bankoo</Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <li>
                <Link to="/transactions">Transactions</Link>
              </li>
              <NavDropdown title={this.state.loggedInUser} id="basic-nav-dropdown">
                <MenuItem eventKey="1">Action</MenuItem>
                <MenuItem eventKey="2">Another action</MenuItem>
                <MenuItem eventKey="3" active>Active Item</MenuItem>
                <MenuItem divider/>
                <MenuItem eventKey="4">Separated link</MenuItem>
              </NavDropdown>
              <NavItem>${this.state.balance}</NavItem>
              <li>
                <Link to="/" onClick={this.logOut}>Log out</Link>
              </li>
            </Nav>
          </Navbar.Collapse>
        </div>
      )
    }
  }
});
