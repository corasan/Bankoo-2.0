var React = require('react');
var Link = require('react-router').Link
var Auth = require('./auth');
var Transactions = require('./transactions');

module.exports = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <Auth />
        </div>
      </nav>
    )
  }
});
