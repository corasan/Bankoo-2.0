var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var Navbar = require('./navbar');
var Transactions = require('./transactions');
var Home = require('./user_home');

var Bankoo = React.createClass({
  render: function() {
    return (
      <div>
        <Navbar />
        {this.props.children}
      </div>
    )
  }
});

ReactDOM.render(
  (
    <Router>
      <Route component={Bankoo}>
        <Route path="/" component={Home} />
        <Route path="transactions" component={Transactions} />
      </Route>
    </Router>
  ), document.getElementById('bankoo-app'));
