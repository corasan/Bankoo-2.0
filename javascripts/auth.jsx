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
      return {loggedInUser: user.google.displayName, balance: 0}
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
      ref.child('users').child(authData.uid).on('value', function(data) {
        var FEED_ITEMS = [
            {name: 'Ice Cream Truck', price: 10, earning: 0.85, shares: 0,
              image: '<img src="https://maxcdn.icons8.com/Color/PNG/96/Food/ice_cream_cone-96.png" title="Ice Cream Cone" width="96">'
            },
            {name: 'Taco Truck', price: 50, earning: 2.20, shares: 0,
              image: '<img src="https://maxcdn.icons8.com/Color/PNG/96/Food/taco-96.png" title="Taco" width="96">'
            },
            {name: 'Intel Corporation', price: 148, earning: 34.04, shares: 0,
              image: '<img src="https://maxcdn.icons8.com/Color/PNG/96/Industry/processor-96.png" title="Processor" width="96">'
            },
            {name: 'Facebook', price: 400, earning: 104.38, shares: 0,
              image: '<img src="https://maxcdn.icons8.com/Color/PNG/96/Social_Networks/facebook-96.png" title="Facebook" width="96">'
            },
            {name: 'Apple', price: 450, earning: 115.20, shares: 0,
              image: '<img src="https://maxcdn.icons8.com/Color/PNG/96/Operating_Systems/mac_os_copyrighted-96.png" title="Mac OS" width="96">'
            },
            {name: 'Google', price: 1250, earning: 768.20, shares: 0,
              image: '<img src="https://maxcdn.icons8.com/Color/PNG/96/Logos/google_logo-96.png" title="Google Logo" width="96">'
            },
            {name: 'Nucear Power Plant', price: 900560, earning: 2700, shares: 0,
              image: '<img src="https://maxcdn.icons8.com/Color/PNG/96/Industry/nuclear_power_plant-96.png" title="Nuclear Power Plant" width="96">'
            },
            {name: 'Biotech', price: 1500000, earning: 5280, shares: 0,
              image: '<img src="https://maxcdn.icons8.com/Color/PNG/96/Industry/biotech-96.png" title="Biotech" width="96">'
            },
            {name: 'Alien Technology', price: 50000000, earning: 22000, shares: 0,
              image: '<img src="https://maxcdn.icons8.com/Color/PNG/96/Cinema/sci-fi-96.png" title="Sci-Fi" width="96">'
            },
        ];
        if (data.exists()) {
          var userData = data.val();
          var name = userData.name,
            balance = userData.balance;
          console.log('Logged in');
          that.setState({loggedInUser: name, balance: balance.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')});
        } else {
          ref.child('users').child(authData.uid).set({
            provider: authData.provider,
            name: authData.google.displayName,
            email: authData.google.email,
            balance: 200,
            earnings: 0,
            investments: FEED_ITEMS
          });
          var signedUser = ref.getAuth();
          ref.child('users').child(signedUser.uid).on('value', function(data) {
            var userData = data.val();
            var name = userData.name,
              balance = userData.balance;
            that.setState({loggedInUser: name, balance: balance.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')});
          });
          console.log('Signed Up');
        }
      });
    }, {
      scope: 'email'
    });
  },
  componentWillMount () {
    var signedUser = ref.getAuth();
    ref.child('users').child(signedUser.uid).on('value', function(data) {
      var userData = data.val();
      this.setState({loggedInUser: userData.name, balance: userData.balance.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')});
    }.bind(this));
  },
  render () {
    var user = ref.getAuth();
    if (!user && user === null) {
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
              <Link to="/">Bankoo</Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav pullRight>
              <li>
                <Link to="/market">Stock Market</Link>
              </li>
              <NavDropdown title={this.state.loggedInUser} id="basic-nav-dropdown">
                <MenuItem eventKey="1">Action</MenuItem>
                <MenuItem eventKey="2">Another action</MenuItem>
                <MenuItem eventKey="3" active>Active Item</MenuItem>
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
              // <li>
              //   <Link to="/transactions">Transactions</Link>
              // </li>
