var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router
var Route = require('react-router').Route
var Link = require('react-router').Link
var MyNavbar = require('./my-navbar');
var Transactions = require('./transactions/transactions');
var UserHome = require('./user-home');
var BankAccount = require('./bank-account/bank-account');
var WelcomePage = require('./welcome-page');
var Investments = require('./investments/investments');
var Firebase = require('firebase');
var ref = new Firebase('https://bankoo.firebaseio.com/');
var user = ref.getAuth();

var Bankoo = React.createClass({
  render () {
    return (
      <div>
        <MyNavbar/>
        {this.props.children}
      </div>
    )
  }
});

ReactDOM.render((
  <Router>
    <Route component={Bankoo}>
      <Route path="/" component={UserHome}/>
      <Route path="investments" component={Investments}/>
    </Route>
  </Router>
), document.getElementById('bankoo-app'));
      // <Route path="transactions" component={Transactions}/>
      // <Route path="/" component={WelcomePage}/>
