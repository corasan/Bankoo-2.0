// var React = require('react');
// var Firebase = require('firebase');
// var ReactFireMixin = require('reactfire');
// var CreateTransaction = require('./create-transaction');
// var UserBalance = require('./user-balance');
// var Panel = require('react-bootstrap').Panel;
// var Grid = require('react-bootstrap').Grid;
// var Row = require('react-bootstrap').Row;
// var Col = require('react-bootstrap').Col;
// var TransactionsTable = require('./transactions-table');
// var ref = new Firebase('https://bankoo.firebaseio.com/');
// var user = ref.getAuth();
//
// module.exports = React.createClass({
//   render () {
//     return (
//       <div className="render-container">
//         <center><h1>Transactions</h1></center>
//           <Grid>
//             <Row>
//               <Col md={2} />
//               <Col md={4}>
//                 <Panel><center><UserBalance/></center></Panel>
//               </Col>
//               <Col md={6} />
//             </Row>
//             <Row className="show-grid">
//               <Col md={2} />
//               <Col md={8}>
//                 <Panel>
//                   <TransactionsTable/>
//                   <center><CreateTransaction/></center>
//                 </Panel>
//               </Col>
//             </Row>
//             <Col md={2} />
//           </Grid>
//       </div>
//     )
//   }
// });
