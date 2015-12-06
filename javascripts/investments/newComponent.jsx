var React = require('react');

var PanelComponent = React.createClass({
  propTypes: {
    element: React.Proptypes.object
  },
  getInitialState() {
    return {
      price: 0,
      value: 0,
      owned: 0,
      buy: 0
    }
  },
  componentWillMount() {
    this.setState({owned: this.props.element.owned, price: this.props.element.price, value: this.props.element.value});
  },
  render() {
    return (
      <Col md={6}>
        <Panel className="move-panel">
          <div className="image" dangerouslySetInnerHTML={{__html: this.props.element.image}} />
          <div className="panel-content">
            <h3>{this.props.element.name}</h3>
            <h4>Price: ${this.state.price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g,'$1,')}</h4>
            <h4>Value: ${this.state.value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g,'$1,')}</h4>
            <h4>Owned: {this.state.owned}</h4>
            <h4>Buy: {this.state.buy}</h4>
          </div>
            <Button onClick={this.handleClick}>button</Button>
        </Panel>
      </Col>
    );
  }
});
