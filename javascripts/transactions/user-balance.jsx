// var React = require('react');
// var ref = new Firebase('https://bankoo.firebaseio.com/');
// var user = ref.getAuth();
// var ReactFire = require('reactfire');
//
// module.exports = React.createClass({
//   mixins: [ReactFire],
//   getInitialState () {
//     return {userBalance: 0.00}
//   },
//   componentDidMount () {
//     var userRef = ref.child('users').child(user.uid);
//     userRef.child('transactions').on('value', function(data) {
//       var total = 0,
//         transactions = data.val();
//       for (var i in transactions) {
//         if (transactions[i].type === "Withdraw") {
//           total -= transactions[i].amount;
//         } else {
//           total += transactions[i].amount;
//         }
//       }
//       userRef.update({balance: total});
//       this.setState({userBalance: total});
//     }.bind(this));
//   },
//   render () {
//     if (this.state.userBalance < 0) {
//       return (
//         <h4 style={{color:"red"}}>Your Balance: ${this.state.userBalance.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g,'$1,')}</h4>
//       )
//     } else {
//       return (
//         <h4 >Your Balance: ${this.state.userBalance.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g,'$1,')}</h4>
//       )
//     }
//   }
// });
