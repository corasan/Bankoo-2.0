var React = require('react');
var Firebase = require('firebase');
var ReactFire = require('reactfire');
var Table = require('react-bootstrap').Table;
var Panel = require('react-bootstrap').Panel;
var ref = new Firebase('https://bankoo.firebaseio.com/');
var user = ref.getAuth();

module.exports = React.createClass({
  render () {
    return (
      <center>
        <Panel style={{width:"800px"}}>
          <Table responsive hover>
            <thead>
              <tr>
                <th>Amount</th>
                <th>Type</th>
              </tr>
            </thead>
            <TransactionsTable/>
          </Table>
        </Panel>
      </center>
    )
  }

});

var TransactionsTable = React.createClass({
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
              <td  style={{color:"#fd4e4e"}}>-{tranData[i].amount}</td>
              <td>{tranData[i].type}</td>
            </tr>
          )
        } else {
          arr.push(
            <tr>
              <td style={{color:"#3fc515"}}>+{tranData[i].amount}</td>
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
