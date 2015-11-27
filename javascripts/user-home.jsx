var React = require('react');
var Panel = require('react-bootstrap').Panel;
var Row = require('react-bootstrap').Row;
var Grid = require('react-bootstrap').Grid;

module.exports = React.createClass({
  render () {
    return (
      <div className="render-container">
        <Row>
          <Grid>
            <Panel>
              <h2>Here I will have the user stats</h2>
            </Panel>
          </Grid>
        </Row>
      </div>
    )
  }
});
