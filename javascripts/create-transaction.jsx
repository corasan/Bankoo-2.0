var React = require('react');
var Firebase = require('firebase');
var Modal = require('react-bootstrap/lib').Modal;
var Button = require('react-bootstrap/lib').Button;
var Input = require('react-bootstrap/lib').Input;
var ref = new Firebase('https://bankoo.firebaseio.com/');
var user = ref.getAuth();

module.exports = React.createClass({
  getInitialState () {
    return {amountText: '', tranType: '', showModal: false, disabled: true}
  },
  close () {
    this.setState({showModal: false, amountText: '', tranType: ''});
  },
  open () {
    this.setState({showModal: true});
  },
  saveTransaction () {
    ref.child('users').child(user.uid).child('transactions').push({
      amount: parseFloat(this.state.amountText),
      type: this.state.tranType
    });
    this.setState({amountText: '', tranType: '', showModal: false, disabled: true});
  },
  handleAmountChange (event) {
    this.setState({amountText: event.target.value});
  },
  handleSelectChange () {
    this.setState({tranType: this.refs.select.getValue(), disabled: false});
  },
  render () {
    return (
      <div className="render-container">
        <Button bsStyle="primary" bsSize="large" onClick={this.open}>
          Launch demo modal
        </Button>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <form>
              <Input type="number" addonBefore="$" label="amountInput" onChange={this.handleAmountChange} value={this.state.amountText}/>
              <Input type="select" label="Transaction Type" ref="select" onChange={this.handleSelectChange}>
                <option>Select Type</option>
                <option>Deposit</option>
                <option>Withdraw</option>
              </Input>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Cancel</Button>
            <Button onClick={this.saveTransaction} disabled={this.state.disabled}>Done</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
});
