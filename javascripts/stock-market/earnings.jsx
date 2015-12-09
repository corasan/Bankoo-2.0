var React = require('react');
var ReactFire = require('reactfire');
var ref = new Firebase('https://bankoo.firebaseio.com/');

var Earnings = React.createClass({
  mixins: [ReactFire],
  getInitialState () {
    return {totalEarnings: 0} //MAKE THIS THE MONEY I ALREADY MADE
  },
  componentWillMount () {
    var user = ref.getAuth();
    this.bindAsObject(ref.child('users').child(user.uid).child('portfolio'), 'portfolio');
  },
  getEarnings () {
    var user = ref.getAuth();
    this.firebaseRefs.portfolio.on('value', function(data) {
      var portData = data.val();
      var total = 0;
      for (var i in portData) {
        total += portData[i].earnings
      }
      ref.child('users').child(user.uid).update({earnings: parseFloat(setInterval(total, 2000))}); // THIS SHOULD BE THE MONEY I EARNED + CURRENT EARNINGS PER SECONDS
      this.setState({totalEarnings: parseFloat(setInterval(total, 2000))}); //EARNINGS INCREASE
    }.bind(this));
  },
  componentDidMount () {
    this.interval = setInterval(this.getEarnings, 2000);
  },
  render () {
    return (
      <h1>Stock earnings: {this.state.totalEarnings}</h1>
    )
  }
});

module.exports = Earnings;
