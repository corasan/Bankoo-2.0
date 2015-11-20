var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var Auth = require('./auth');
var Transactions = require('./transactions');

module.exports = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <ul className="nav navbar-nav navbar-left"><li><a>Home</a></li></ul>
          <Auth />
        </div>
      </nav>
    )
  }
});
