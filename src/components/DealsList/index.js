import React, { Component, PropTypes } from 'react';
import { Table, Icon, Popup } from 'semantic-ui-react';
import { connect } from 'react-redux';
import sortBy from 'lodash/sortBy';

import Message from '../Message';
import GetUSD from '../GetUSD';
import DealsFilter from '../DealsFilter';

import { removeDeal } from '../../actions';

import styles from './styles.scss';

const tableHeaders = [
  {
    key: 'date',
    value: 'Дата',
  },
  {
    key: 'customerName',
    value: 'Имя заказчика',
  },
  {
    key: 'contractorName',
    value: 'Имя исполнителя',
  },
  {
    key: 'amount',
    value: 'Сумма сделки',
  },
  {
    key: 'commission',
    value: 'Комиссия',
  },
  {
    key: 'customerPaying',
    value: 'Оплата комиссии',
  },
];

const renderDeals = (deals, remove) => deals
  .map(({ id, date, customerName, contractorName, amount, commission, customerPaying }) => (
    <Table.Row key={id}>
      <Table.Cell>{date}</Table.Cell>
      <Table.Cell>{customerName}</Table.Cell>
      <Table.Cell>{contractorName}</Table.Cell>
      <Table.Cell>
        {`${amount} ETH `}
        <GetUSD number={amount} />
      </Table.Cell>
      <Table.Cell>
        {`${commission} ETH `}
        <GetUSD number={commission} />
      </Table.Cell>
      <Table.Cell>
        {customerPaying ? 'Заказчик' : 'Исполнитель'}
      </Table.Cell>
      <Table.Cell textAlign="center">
        <Popup
          trigger={<Icon className={styles['app-deals-list-remove-icon']} link onClick={() => remove(id)} name="remove" />}
          content="Удалить сделку"
          basic
        />
      </Table.Cell>
    </Table.Row>
  ));

class FormExampleForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      deals: props.deals,
      sortDirection: false,
      sortField: null,
    };

    this.sortDeals = this.sortDeals.bind(this);
    this.updateDealsList = this.updateDealsList.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      deals: sortBy(nextProps.deals, item => this.compareValues(item, this.state.sortField)),
    });
  }

  updateDealsList(deals) {
    this.setState({
      deals,
    });
  }

  compareValues(item, field) {
    const sortDirection = this.state.sortDirection;
    let value = sortDirection ? Number(item[field]) : -Number(item[field]);

    if (!field) return false;

    if (field === 'date') {
      value = sortDirection ? Number(new Date(item[field])) : -Number(new Date(item[field]));
    } else if (field === 'customerName' || field === 'contractorName') {
      value = sortDirection ? item[field][0].charCodeAt(0) : -item[field].charCodeAt(0);
    }

    return value;
  }

  sortDeals(sortField) {
    const sortDirection = !this.state.sortDirection;

    this.setState({
      deals: sortBy(this.state.deals, item => this.compareValues(item, sortField)),
      sortDirection,
      sortField,
    });
  }

  render() {
    const { deals } = this.state;
    return (
      <div>
        {this.props.deals.length
        ?
          <div>
            <DealsFilter deals={this.props.deals} updateDealsList={this.updateDealsList} />
            <Table celled sortable>
              <Table.Header>
                <Table.Row>
                  {
                    tableHeaders.map(header => (
                      <Table.HeaderCell key={header.key} onClick={() => this.sortDeals(header.key)}>
                        {header.value}
                      </Table.HeaderCell>
                    ))
                  }
                  <Table.HeaderCell disabled>{''}</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {renderDeals(deals, this.props.removeDeal)}
              </Table.Body>
            </Table>
          </div>
        :
          <Message
            header="Нет сделок!"
            text="Похоже, что ни одна сделка не была создана."
          />
        }
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeDeal: id => dispatch(removeDeal(id)),
  };
}

function mapStateToProps(store) {
  return {
    deals: store.deal.deals,
  };
}

FormExampleForm.propTypes = {
  deals: PropTypes.arrayOf(Object).isRequired,
  removeDeal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(FormExampleForm);
