var React = require('react');
var ReactFire = require('reactfire');
var ref = new Firebase('https://bankoo.firebaseio.com/');

var  = React.createClass({
  var user = ref.getAuth();
  mixins: [ReactFire],
  componentWillMount: function() {
    this.bindAsObject(ref.child('users').child(user.uid).child('investments'), 'investments');
  },
  render: function() {
    return (
      <div />
    );
  }

});

module.exports = ;
