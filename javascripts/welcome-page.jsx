var React = require('react');
var Jumbotron = require('react-bootstrap').Jumbotron;
var Button = require('react-bootstrap').Button;
var Auth = require('./auth');
var ref = new Firebase('https://bankoo.firebaseio.com/');
var Link = require('react-router').Link;

module.exports = React.createClass({
  render () {
    return (
      <div>
        <Jumbotron className="jumbo-welcome">
          <h1>Welcome to Bankoo!</h1>
          <p>The best way to invest and manage your money.</p>
          <div className="jumbotron-button">
            <Link to="/home">Log in with Google</Link>
          </div>
        </Jumbotron>
        <div className="bankoo-info">
        </div>
      </div>
    )
  }
});
            // <Button id="jumbotron-button" bsStyle="primary" bsSize="large">Log in With Google</Button>
