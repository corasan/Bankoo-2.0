var React = require('react');
var ReactDOM = require('react-dom');
var NavBar = require('./navbar');

var Bankoo = React.createClass({
  render: function() {
    return (
      <NavBar />
    )
  }
});

ReactDOM.render(<Bankoo />, document.getElementById('bankoo-app'));
