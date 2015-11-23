var React = require('react');
var Navbar = require('react-bootstrap/lib').Navbar;
var Link = require('react-router').Link
var Auth = require('./auth');

module.exports = React.createClass({
  render () {
    return (
      <Navbar inverse className="navbar-fixed-top">
        <Auth/>
      </Navbar>
    )
  }
});
