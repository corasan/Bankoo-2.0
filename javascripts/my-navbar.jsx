var React = require('react');
var Navbar = require('react-bootstrap/lib').Navbar;
var Link = require('react-router').Link
var Auth = require('./auth');
var ref = new Firebase('https://bankoo.firebaseio.com/');
var user = ref.getAuth();

module.exports = React.createClass({
  render () {
    return (
      <Navbar inverse className="navbar-fixed-top">
        <Auth/>
      </Navbar>
    )
  }
});
