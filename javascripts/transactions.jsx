var React = require('react');
var ReactDOM = require('react-dom');
var Firebase = require('firebase');
var ReactFireMixin = require('reactfire');
var ref = new Firebase('https://bankoo.firebaseio.com/');

module.exports = React.createClass({
  render: function() {
    return (
      <div>
        <h1>Transactions</h1>
      </div>
    )
  }
});

// ReactDOM.render(<Transactions />, document.getElementById('transactions-component'));

var CreateTransactions = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function() {
    return {
      dateText: '',
      amountText: '',
      typeText: ''
    }
  },

  componentWillMount: function() {
    var user = ref.getAuth();
    this.tranRef = new Firebase(ref + `/users/${user.uid}/transactions`);
    this.bindAsObject(this.tranRef, 'transactions');
  }
  // var transactions = ref.child('users').child(user.uid).child('transactions').set({
  //   tranDate:
  //   tranAmount:
  //   tranType:
  // })
});
