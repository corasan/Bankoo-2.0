var React = require('react');
var MarketItems = require('./marketItems');
var Col = require('react-bootstrap').Col;
var PropTypes = React.PropTypes;

var MarketList = React.createClass({
  render () {
    var marketItems = this.props.items.map(function(item, i) {
      return(
        <MarketItems key={i} index={i} name={item.name} price={item.price} earning={item.earning} shares={item.shares} image={item.image}/>
      );
    });
    return (
      <div className="panels-width">
        {marketItems}
      </div>
    );
  }

});

module.exports = MarketList;
