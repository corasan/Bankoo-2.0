var React = require('react');
var Firebase = require('firebase');
var ReactFire = require('reactfire');
var ref = new Firebase('https://bankoo.firebaseio.com/');
var Panel = require('react-bootstrap').Panel;
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;
var PanelComponent = require('react-bootstrap');
var MarketList = require('./marketList');
var Earnings = require('./earnings');

module.exports = React.createClass({
  mixins: [ReactFire],
  getInitialState () {
    return {
      items: []
    }
  },
  componentWillMount () {
    var user = ref.getAuth();
    this.bindAsArray(ref.child('users').child(user.uid).child('investments'), 'items');
    this.firebaseRefs.items.on('value', function(data) {
      var invData = data.val();
      this.setState({items: invData});
    }.bind(this));
  },
  render () {
    return (
      <div className="render-container">
        <Grid>
          <h2 className="page-title">Market</h2>
          <Earnings/>
          <hr/>
          <Row>
            <MarketList items={this.state.items} />
          </Row>
        </Grid>
      </div>
    )
  }
});
