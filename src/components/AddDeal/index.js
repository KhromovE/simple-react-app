import React, { Component, PropTypes } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { connect } from 'react-redux';

import GetUSD from '../GetUSD';

import { redirect } from '../../services/methods';
import { createDeal } from '../../actions';
import styles from './styles.scss';

const COMMISSION = 0.015;
const MIN_COMMISSION = 0.3;
const MAX_COMMISSION = 5;

const additionData = [
  {
    title: 'Комиссия',
    key: 'commission',
  },
  {
    title: 'Сумма к оплате',
    key: 'paidAmount',
  },
  {
    title: 'Сумма к получению',
    key: 'receivedAmount',
  },
];


class AddDeal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      model: {
        customerPaying: true,
        amount: '',
        paidAmount: '0',
        receivedAmount: '0',
        commission: MIN_COMMISSION.toString(),
      },
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.getAddingData = this.getAddingData.bind(this);
  }

  componentDidUpdate(nextProps, prevState) {
    const isAmountChanged = prevState.model.amount !== this.state.model.amount;
    const isPayingChanged = prevState.model.customerPaying !== this.state.model.customerPaying;

    if (isAmountChanged || isPayingChanged) {
      this.getAddingData();
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.createDeal(this.state.model);
    redirect('/');
  }

  getAddingData() {
    const commission = this.getCommission();
    const paidAmount = this.getPaidAmount(commission);
    const receivedAmount = this.getReceivedAmount(commission);

    this.setState({
      model: Object.assign({}, this.state.model, {
        commission: commission.toString(),
        paidAmount: paidAmount.toString(),
        receivedAmount: receivedAmount.toString(),
      }),
    });
  }

  getCommission() {
    const amount = this.state.model.amount;
    let commission = amount * COMMISSION;

    if (commission > MAX_COMMISSION) {
      commission = MAX_COMMISSION;
    } else if (commission < MIN_COMMISSION) {
      commission = MIN_COMMISSION;
    }

    return commission;
  }

  getPaidAmount(commission) {
    const amount = Number(this.state.model.amount);
    const customerPaying = this.state.model.customerPaying;

    return customerPaying ? amount + commission : amount;
  }

  getReceivedAmount(commission) {
    const amount = Number(this.state.model.amount);
    const customerPaying = this.state.model.customerPaying;

    return customerPaying ? amount : amount - commission;
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      model: Object.assign({}, this.state.model, {
        [name]: value,
      }),
    });
  }

  render() {
    const customerPaying = 'Заказ оплачивает заказчик';
    const contractorPaying = 'Заказ оплачивает исполнитель';

    return (
      <Form onSubmit={this.onSubmit}>
        <Form.Field>
          <label htmlFor="date">Дата</label>
          <input
            type="date"
            name="date"
            id="date"
            placeholder="Дата"
            onChange={this.handleInputChange}
            required
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="customer-name">Имя заказчика</label>
          <input
            id="customer-name"
            name="customerName"
            placeholder="Имя заказчика"
            onChange={this.handleInputChange}
            required
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="contractor-name">Имя исполнителя</label>
          <input
            id="contractor-name"
            name="contractorName"
            placeholder="Имя исполнителя"
            onChange={this.handleInputChange}
            required
          />
        </Form.Field>
        <Form.Field>
          <label htmlFor="amount">Сумма сделки</label>
          <div className={styles['app-add-deal-amount']}>
            <div className={styles['app-deal-amount-input']}>
              <input
                id="amount"
                name="amount"
                type="number"
                min="1"
                placeholder="Сумма сделки"
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className={styles['app-deal-amount-usd']}>
              <GetUSD number={this.state.model.amount} />
            </div>
          </div>
          <div className={styles['app-deal-amount-additions']}>
            {
              additionData.map(item => (
                <div key={item.key} className={styles['app-deal-amount-addition']}>
                  {`${item.title}: ${Number(this.state.model[item.key]).toFixed(2)} ETH `}
                  <GetUSD number={this.state.model[item.key]} />
                </div>
              ))
            }
          </div>
        </Form.Field>
        <Form.Field>
          <div className="ui toggle checkbox">
            <input
              id="customer-paying"
              type="checkbox"
              name="customerPaying"
              onChange={this.handleInputChange}
              checked={this.state.model.customerPaying}
            />
            <label htmlFor="customer-paying">
              {this.state.model.customerPaying ? customerPaying : contractorPaying}
            </label>
          </div>
        </Form.Field>
        <Button type="submit">Добавить</Button>
      </Form>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    createDeal: data => dispatch(createDeal(data)),
  };
}

function mapStateToProps(store) {
  return {
    USDT_ETH: store.ticker.USDT_ETH,
  };
}

AddDeal.propTypes = {
  createDeal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddDeal);
