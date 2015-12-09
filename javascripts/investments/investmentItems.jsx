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
      buy: 0,
      disabled: true
    }
  },
  handleAddButton () {
    this.setState({buy: this.state.buy+1});
  },
  handleSubtractButton () {
    this.setState({buy: this.state.buy-1});
  },
  componentWillMount () {
    this.bindAsObject(ref.child(user.uid).child('investments'), 'investments');
  },
  buyButton () {
    this.firebaseRefs.investments.once('value', function(data) {
      var invData = data.val();
      console.log("invData: ", invData);
      var currentInvestment = ref.child(user.uid).child("investments").child(this.props.index);
      currentInvestment.update({owned: invData[this.props.index].owned + this.state.buy, });
      var userRef = ref.child(user.uid);
      userRef.once('value', function(snap) {
        var userData = snap.val();
        currentInvestment.on('value', function(investmentsData) {
          var investData = investmentsData.val();
          var total = investData.price * this.state.buy;
          userRef.update({balance: userData.balance - total});
        }.bind(this));
      }.bind(this));
    }.bind(this));
    this.setState({buy: 0});
  },
  render: function() {
    return (
      <Col md={6}>
        <Panel className="move-panel">
          <div className="image" dangerouslySetInnerHTML={{__html: this.props.image}} />
          <div className="panel-content">
            <h3>{this.props.name}</h3>
            <h4>Price: ${this.props.price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g,'$1,')}</h4>
            <h4>Earning: ${this.props.earning.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g,'$1,')}</h4>
            <h4>Shares: {this.props.owned}</h4>
            <h4>Buy: {this.state.buy} <a onClick={this.handleSubtractButton}><img className="icon icons8-Minus" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAABdUlEQVRIS71VS07CUBQ9FxInrWsAd4ADcIrVBcAGFAfO3YGwDkxsdAGwAG2cWgayhHYHGutE0x7TR0sK9BcodNb09nzuV7DnR8rge912S4QNSK2l4hnMSXH1t9m86P9cgm+jMxTgGoJmKhDhCGBqlj3KIkolCBWjJpNM4HU0wkHAfpqjDQLPaA8g8lhkPd0Rb3RrZia/rRAo5XX52Ao8LA35KQHOk05WCYyOA0FjW4JFA8DRLfskxlgSqIIK7ncCj34mMTq27GH4uiTwqlAfq0u4UAS75j7Vtc/TsBaK4Oei0yMwWQ88uroNC1eYtb/nh40YAfraqz1VBFn5117eC8GVwMuzjbi4DochyEtRGQu/T+P8FO29yKqTqm1TV7dstSAPN2iVuSCW6lccVDFwBL/ERzdz2S1cbLeuFThxl7uu416LDs609GYlXATslTo4yYaOTuYgk4hwCZjx5kybmfJHvy7NgFBHvyaY06ez89EvM8VFMf/G3LcZOf6MyQAAAABJRU5ErkJggg==" width="24" height="24"/></a><a onClick={this.handleAddButton}><img className="icon" src="https://maxcdn.icons8.com/Color/PNG/24/Very_Basic/plus-24.png" title="Plus" width="24"/></a>
            </h4>
          </div>
          <center><Button bsStyle="primary" onClick={this.buyButton} style={{width:"250px"}} block>Buy</Button></center>
        </Panel>
      </Col>
    );
  }

});

module.exports = InvestmentItems;
