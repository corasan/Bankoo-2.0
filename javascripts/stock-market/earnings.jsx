var React = require('react');
var ReactFire = require('reactfire');
var ref = new Firebase('https://bankoo.firebaseio.com/');

var Earnings = React.createClass({
  mixins: [ReactFire],
  getInitialState: function(){
    return {totalEarnings: 0}
  },
  componentWillMount: function(){
    var user = ref.getAuth();
    this.bindAsObject(ref.child('users').child(this.props.useruid).child('portfolio'), 'portfolio');
  },
  getEarnings: function(){
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
            this.setState({totalEarnings: parseFloat(userAttr.earnings) + parseFloat(total)});
            ref.child('users').child(this.props.useruid).update({earnings: this.state.totalEarnings.toFixed(2)});
          }
        }.bind(this));
      }.bind(this));
    }
  },
  componentDidMount: function(){
    this.interval = setInterval(this.getEarnings, 1000);
  },
  render: function(){
    return (
      <h1>Stock earnings: ${this.state.totalEarnings.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g,'$1,')}</h1>
    )
  }
});

module.exports = Earnings;
