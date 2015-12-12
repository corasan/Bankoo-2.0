var React = require('react');
var Navbar = require('react-bootstrap/lib').Navbar;
var Link = require('react-router').Link
var Auth = require('./auth');
var ref = new Firebase('https://bankoo.firebaseio.com/');

module.exports = React.createClass({
  render: function() {
    return (
      <Navbar inverse className="navbar-fixed-top">
        <Auth/>
      </Navbar>
    )
  }
});
