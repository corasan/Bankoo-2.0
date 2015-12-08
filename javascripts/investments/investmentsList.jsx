var React = require('react');
var InvestmentItems = require('./investmentItems');
var Col = require('react-bootstrap').Col;
var PropTypes = React.PropTypes;

var InvestmentList = React.createClass({
  render () {
    var investmentItems = this.props.items.map(function(item, i) {
      return(
        <InvestmentItems key={i} index={i} name={item.name} price={item.price} earning={item.earning} owned={item.owned} image={item.image}/>
      );
    });
    return (
      <div className="panels-width">
        {investmentItems}
      </div>
    );
  }

});

module.exports = InvestmentList;
