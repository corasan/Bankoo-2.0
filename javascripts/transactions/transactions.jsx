var React = require('react');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
var CreateTransaction = require('./create-transaction');
var UserBalance = require('./user-balance');
var ref = new Firebase('https://bankoo.firebaseio.com/');
var user = ref.getAuth();

module.exports = React.createClass({
  render () {
    return (
      <div className="render-container">
        <h1>Transactions</h1>
        <UserBalance/>
        <CreateTransaction/>
      </div>
    )
  }
});
