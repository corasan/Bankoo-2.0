var React = require('react');
var ReactFire = require('reactfire');
var ref = new Firebase('https://bankoo.firebaseio.com/');

var Earnings = React.createClass({
  mixins: [ReactFire],
  getInitialState () {
    return {totalEarnings: 0, earningsPerSecond: 0}
  },
  componentWillMount () {
    var user = ref.getAuth();
    this.bindAsObject(ref.child('users').child(this.props.useruid).child('portfolio'), 'portfolio');
  },
  getEarnings () {
    var user = ref.getAuth();
    if (user && this.firebaseRefs.portfolio) {
      ref.child('users').child(this.props.useruid).once('value', function(userData) {
        this.firebaseRefs.portfolio.on('value', function(data) {
          var userAttr = userData.val();
          if (data.exists()) {
            var portData = data.val();
            var total = 0;
            for (var i in portData) {
              total += portData[i].earnings
            }
            this.setState({totalEarnings: parseFloat(userAttr.earnings) + parseFloat(total), earningsPerSecond: total});
            ref.child('users').child(this.props.useruid).update({earnings: this.state.totalEarnings.toFixed(2)});
          }
        }.bind(this));
      }.bind(this));
    }
  },
  componentDidMount () {
    this.interval = setInterval(this.getEarnings, 1000);
  },
  render () {
    return (
      <div>
        <h2>Stock earnings: ${this.state.totalEarnings.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g,'$1,')}</h2>
        <h2>Earnings per seconds: ${this.state.earningsPerSecond.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g,'$1,')}</h2>
      </div>
    )
  }
});

module.exports = Earnings;
