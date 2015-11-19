var React = require('react');
var Auth = require('./auth');

module.exports = React.createClass({
  render: function() {
    return (
      <nav className="navbar navbar-inverse navbar-fixed-top">
        <div className="container-fluid">
          <Auth />
        </div>
      </nav>
    )
  }
});
