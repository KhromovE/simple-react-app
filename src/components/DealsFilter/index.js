import React, { Component, PropTypes } from 'react';
import { Input, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';
import filter from 'lodash/filter';

const options = [
  { key: 'ETH', text: 'ETH', value: 'ETH' },
  { key: 'USD', text: 'USD', value: 'USD' },
];

class DealsFilter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currency: options[0].value,
      amount: '',
      customerName: '',
      contractorName: '',
      date: '',
    };

    this.onChangeCurrency = this.onChangeCurrency.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidUpdate() {
    this.filterDeal();
  }

  onChangeCurrency(event, data) {
    this.setState({
      currency: data.value,
      amount: '',
    });
  }

  filterDeal() {
    const usdToEth = this.props.USDT_ETH;
    const { currency, customerName, contractorName, date } = this.state;
    const amountFilter = this.state.amount;

    const deals = filter(this.props.deals, (deal) => {
      const dealAmount = currency === options[0].value ? deal.amount : deal.amount * usdToEth;

      if (amountFilter.length) {
        if (~~Number(dealAmount) !== Number(amountFilter)) {
          return false;
        }
      }

      if (customerName.length) {
        if (deal.customerName.indexOf(customerName) < 0) {
          return false;
        }
      }

      if (contractorName.length) {
        if (deal.contractorName.indexOf(contractorName) < 0) {
          return false;
        }
      }

      if (date.length) {
        if (deal.date.indexOf(date) < 0) {
          return false;
        }
      }

      return true;
    });

    this.props.updateDealsList(deals);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  }

  render() {
    return (
      <div>
        <Form>
          <Form.Group widths="equal">
            <Form.Field>
              <Form.Select
                options={options}
                value={this.state.currency}
                onChange={this.onChangeCurrency}
                placeholder="Валюта сделки"
              />
            </Form.Field>
            <Form.Field>
              <Input
                name="amount"
                type="number"
                value={this.state.amount}
                onChange={this.handleInputChange}
                placeholder="Сумма сделки"
              />
            </Form.Field>
            <Form.Field>
              <Input
                name="customerName"
                type="text"
                value={this.state.customerName}
                onChange={this.handleInputChange}
                placeholder="Имя заказчика"
              />
            </Form.Field>
            <Form.Field>
              <Input
                name="contractorName"
                type="text"
                value={this.state.contractorName}
                onChange={this.handleInputChange}
                placeholder="Имя исполнителя"
              />
            </Form.Field>
            <Form.Field>
              <Input
                name="date"
                type="date"
                value={this.state.date}
                onChange={this.handleInputChange}
              />
            </Form.Field>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

function mapStateToProps(store) {
  return {
    USDT_ETH: store.ticker.USDT_ETH,
  };
}

DealsFilter.propTypes = {
  deals: PropTypes.arrayOf(PropTypes.object).isRequired,
  USDT_ETH: PropTypes.string.isRequired,
  updateDealsList: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(DealsFilter);
