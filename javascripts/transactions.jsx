var React = require('react');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
var CreateTransaction = require('./create-transaction');
var ref = new Firebase('https://bankoo.firebaseio.com/');
var user = ref.getAuth();
var userRef = ref.child('users').child(user.uid);

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

var UserBalance = React.createClass({
  getInitialState () {
    return {userBalance: 0}
  },
  componentDidMount () {
    var that = this;
    userRef.child('transactions').on('value', function(data) {
      console.log(data.val());
      var arr = [],
        total = 0,
        transactions = data.val()
      for (var i in transactions) {
        arr.push(transactions[i].amount);
      }
      total = arr.reduce(function(previous, current, index) {
        return previous + current;
      });
      userRef.update({balance: total});
      that.setState({userBalance: total});
    });
  },
  render () {
    return (
      <h3>Your Balance: ${this.state.userBalance}</h3>
    )
  }
});

// var TransactionsTable = React.createClass({
//   getTransactions () {}
// });
