var React = require('react');
var Firebase = require('firebase');
var ReactFire = require('reactfire');
var Table = require('react-bootstrap').Table;
var ref = new Firebase('https://bankoo.firebaseio.com/');
var user = ref.getAuth();

module.exports = React.createClass({
  render () {
    return (
      <Table responsive hover>
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Type</th>
          </tr>
        </thead>
        <TableBody/>
      </Table>
    )
  }

});

var TableBody = React.createClass({
  mixins: [ReactFire],
  getInitialState () {
    return {
      items: []
    }
  },
  componentDidMount () {
    var tranRefs = ref.child('users').child(user.uid).child('transactions');
    this.bindAsObject(tranRefs, 'tran');
    this.firebaseRefs.tran.limitToLast(10).on('value', function(data) {
      var tranData = data.val();
      var arr = [];
      for (var i in tranData) {
        if (tranData[i].type === 'Withdraw'){
          arr.push(
            <tr>
              <td>{tranData[i].date}</td>
              <td  style={{color:"#fd4e4e"}}>-{tranData[i].amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g,'$1,')}</td>
              <td>{tranData[i].type}</td>
            </tr>
          )
        } else {
          arr.push(
            <tr>
              <td>{tranData[i].date}</td>
              <td style={{color:"#3fc515"}}>+{tranData[i].amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g,'$1,')}</td>
              <td>{tranData[i].type}</td>
            </tr>
          )
        }
      }
      this.setState({items: arr.reverse()});

    }.bind(this));
  },
  render () {
    return (
      <tbody>
        {this.state.items}
      </tbody>
    )
  }
});
