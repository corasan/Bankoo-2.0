module.exports = React.createClass({
  getInitialState () {
    return {userBalance: 0}
  },
  componentWillMount () {
    var that = this;
    var userRef = ref.child('users').child(user.uid);
    userRef.child('transactions').on('value', function(data) {
      var arr = [],
        total = 0,
        transactions = data.val();
      for (var i in transactions) {
        if (transactions[i].type == "Withdraw") {
          total -= transactions[i].amount;
        } else {
          total += transactions[i].amount;
        }
      }
      // total = arr.reduce(function(previous, current, index) {
      //   return previous + current;
      // });
      userRef.update({balance: total});
      that.setState({userBalance: total});
    });
  },
  render () {
    if (this.state.userBalance < 0) {
      return (
        <h3 style={{color:"red"}}>Your Balance: ${this.state.userBalance.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</h3>
      )
    } else {
      return (
        <h3 >Your Balance: ${this.state.userBalance.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</h3>
      )
    }
  }
});
