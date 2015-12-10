var React = require('react');
var ReactFire = require('reactfire');
var ref = new Firebase('https://bankoo.firebaseio.com/');
var user = ref.getAuth();

var Earnings = React.createClass({
  mixins: [ReactFire],
  getInitialState () {
    return {totalEarnings: 0}
  },
  componentWillMount () {
    this.bindAsObject(ref.child('users').child(user.uid).child('portfolio'), 'portfolio');
  },
  getEarnings () {
    ref.child('users').child(user.uid).once('value', function(userData) {
      this.firebaseRefs.portfolio.on('value', function(data) {
        var userAttr = userData.val();
        if (data.exists()) {
          var portData = data.val();
          var total = 0;
          for (var i in portData) {
            total += portData[i].earnings
          }
          this.setState({totalEarnings: parseFloat(userAttr.earnings) + parseFloat(total)});
          ref.child('users').child(user.uid).update({earnings: this.state.totalEarnings.toFixed(2)});
        }
      }.bind(this));
    }.bind(this));
  },
  componentDidMount () {
    this.interval = setInterval(this.getEarnings, 1000);
  },
  render () {
    return (
      <h1>Stock earnings: ${this.state.totalEarnings.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g,'$1,')}</h1>
    )
  }
});

module.exports = Earnings;
