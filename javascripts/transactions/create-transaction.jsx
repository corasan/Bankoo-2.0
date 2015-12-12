// var React = require('react');
// var Firebase = require('firebase');
// var Modal = require('react-bootstrap/lib').Modal;
// var Glyphicon = require('react-bootstrap/lib').Glyphicon;
// var Button = require('react-bootstrap/lib').Button;
// var Input = require('react-bootstrap/lib').Input;
// var ref = new Firebase('https://bankoo.firebaseio.com/');
// var user = ref.getAuth();
//
// module.exports = React.createClass({
//   getInitialState: function() {
//     return {amountInput: '', tranType: '', showModal: false, disabled: true}
//   },
//   close: function() {
//     this.setState({showModal: false, amountInput: '', tranType: ''});
//   },
//   open: function() {
//     this.setState({showModal: true});
//   },
//   saveTransaction: function() {
//     var date = new Date();
//     var day = date.getDate(),
//       month = date.getMonth(),
//       year = date.getFullYear();
//
//     ref.child('users').child(user.uid).child('transactions').push({
//       amount: parseFloat(this.state.amountInput),
//       type: this.state.tranType,
//       date: `${month}/${day}/${year}`
//     });
//     this.setState({amountInput: '', tranType: '', showModal: false, disabled: true});
//   },
//   handleAmountChange (event) {
//     this.setState({amountInput: event.target.value});
//   },
//   handleSelectChange: function() {
//     this.setState({tranType: this.refs.select.getValue(), disabled: false});
//   },
//   render: function() {
//     return (
//       <div>
//         <Button bsStyle="primary" bsSize="large" onClick={this.open}>
//           <i className="fa fa-plus"></i> New Transaction
//         </Button>
//
//         <Modal show={this.state.showModal} onHide={this.close}>
//           <Modal.Header closeButton>
//             <center><Modal.Title>Transaction</Modal.Title></center>
//           </Modal.Header>
//           <Modal.Body>
//             <form>
//               <Input type="text" addonBefore="$" label="Amount" onChange={this.handleAmountChange} value={this.state.amountInput}/>
//               <Input type="select" label="Transaction Type" ref="select" onChange={this.handleSelectChange}>
//                 <option>Select Type</option>
//                 <option>Deposit</option>
//                 <option>Withdraw</option>
//               </Input>
//             </form>
//           </Modal.Body>
//           <Modal.Footer>
//             <center>
//               <Button onClick={this.close} bsStyle="danger"><Glyphicon glyph="remove"/></Button>
//               <Button onClick={this.saveTransaction} bsStyle="success" disabled={this.state.disabled}><Glyphicon glyph="ok"/></Button>
//             </center>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     );
//   }
// });
