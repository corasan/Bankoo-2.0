var React = require('react');
var Firebase = require('firebase');
var ref = new Firebase('https://bankoo.firebaseio.com/');
var user = ref.getAuth();

module.exports = React.createClass({
  getInitialState () {
  //   var FEED_ITEMS = [
  //     {name: 'one', price: 10, value: 5, owned: 0},
  //     {name: 'two', price: 15, value: 8, owned: 0}
  //   ];
    return {
      balance : 0,
      showModal: false
  //     items: FEED_ITEMS
    }
  },
  componentWillMount () {
    var userRef = ref.child('users').child(user.uid);
    userRef.on('value', function(data) {
      var userData = data.val();
      var balance = userData.balance;
      this.setState({balance: balance});
    }.bind(this));
  },
  transferMoney () {
    var userRef = ref.child('users').child(user.uid);
    userRef.on('value', function(data) {

    }.bind(this));
  },
  render () {
    return (
      <div className="render-container">
        <h1>Balance: ${this.state.balance}</h1>
      </div>
    )
  }
});
