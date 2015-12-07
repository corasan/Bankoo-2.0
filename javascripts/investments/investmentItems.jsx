var React = require('react');
var ReactFire = require('reactfire');
var Panel = require('react-bootstrap').Panel;
var Col = require('react-bootstrap').Col;
var Button = require('react-bootstrap').Button;
var PropTypes = React.PropTypes;
var ref = new Firebase('https://bankoo.firebaseio.com/users');
var user = ref.getAuth();

var InvestmentItems = React.createClass({
  mixins: [ReactFire],
  getInitialState () {
    return {
      buy: 0
    }
  },
  componentWillMount () {
  },
  handleAddButton () {
    this.setState({buy: this.state.buy+1});
  },
  handleSubtractButton () {
    this.setState({buy: this.state.buy-1});
  },
  buyButton () {
    this.bindAsObject(ref.child(user.uid).child('investments'), 'investments');
    // this.firebaseRefs.investments.on('value', function(data) {
    //   var invData = data.val();
    //
    // }.bind(this));
    this.firebaseRefs.investments.update({owned: this.props.owned + this.state.buy});
  },
  render: function() {
    return (
      <Col key={this.props.key} md={6}>
        <Panel className="move-panel">
          <div className="image" dangerouslySetInnerHTML={{__html: this.props.image}} />
          <div className="panel-content">
            <h3>{this.props.name}</h3>
            <h4>Price: ${this.props.price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g,'$1,')}</h4>
            <h4>Earning: ${this.props.earning.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g,'$1,')}</h4>
            <h4>Owned: {this.props.owned}</h4>
            <h4>Buy <a onClick={this.handleSubtractButton}><img className="icon icons8-Minus" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABdUlEQVRIS71VS07CUBQ9FxInrWsAd4ADcIrVBcAGFAfO3YGwDkxsdAGwAG2cWgayhHYHGutE0x7TR0sK9BcodNb09nzuV7DnR8rge912S4QNSK2l4hnMSXH1t9m86P9cgm+jMxTgGoJmKhDhCGBqlj3KIkolCBWjJpNM4HU0wkHAfpqjDQLPaA8g8lhkPd0Rb3RrZia/rRAo5XX52Ao8LA35KQHOk05WCYyOA0FjW4JFA8DRLfskxlgSqIIK7ncCj34mMTq27GH4uiTwqlAfq0u4UAS75j7Vtc/TsBaK4Oei0yMwWQ88uroNC1eYtb/nh40YAfraqz1VBFn5117eC8GVwMuzjbi4DochyEtRGQu/T+P8FO29yKqTqm1TV7dstSAPN2iVuSCW6lccVDFwBL/ERzdz2S1cbLeuFThxl7uu416LDs609GYlXATslTo4yYaOTuYgk4hwCZjx5kybmfJHvy7NgFBHvyaY06ez89EvM8VFMf/G3LcZOf6MyQAAAABJRU5ErkJggg==" width="24" height="24"/></a> {this.state.buy} <a onClick={this.handleAddButton}><img className="icon" src="https://maxcdn.icons8.com/Color/PNG/24/Very_Basic/plus-24.png" title="Plus" width="24"/></a>
            </h4>
            <Button bsStyle="primary" onClick={this.buyButton}>Buy</Button>
          </div>
        </Panel>
      </Col>
    );
  }

});

module.exports = InvestmentItems;
