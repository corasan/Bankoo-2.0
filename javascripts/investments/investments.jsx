var React = require('react');
var Firebase = require('firebase');
var ReactFire = require('reactfire');
var ref = new Firebase('https://bankoo.firebaseio.com/');
var user = ref.getAuth();
var Panel = require('react-bootstrap').Panel;
var Grid = require('react-bootstrap').Grid;
var Row = require('react-bootstrap').Row;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;
var PanelComponent = require('react-bootstrap');


module.exports = React.createClass({
  mixins: [ReactFire],
  getInitialState () {
    return {
      items: []
    }
  },
  handleClick () {
    console.log('buttttoooonnn');
    this.setState({buy: this.state.buy+1});
  },
  // componentWillMount () {
  // },
  componentDidMount () {
    this.bindAsObject(ref.child('users').child(user.uid).child('investments'), 'investments');
    this.firebaseRefs.investments.once('value', function(data) {
      var invData = data.val();
      var arr = invData.map(function(element,i) {
        return (
          <PanelComponent key={i} element={element}/>
        )
      }.bind(this));
      this.setState({items: arr});
    }.bind(this));
  },
  render () {
    return (
      <div className="render-container">
        <Grid>
          <Row>
            <div className="panels-width">
              {this.state.items}
            </div>
          </Row>
        </Grid>
      </div>
    )
  }
});
