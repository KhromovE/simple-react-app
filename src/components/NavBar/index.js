import React, { Component, PropTypes } from 'react';
import { Menu, Container, Button, Loader } from 'semantic-ui-react';
import { connect } from 'react-redux';

import { redirect } from '../../services/methods';
import styles from './styles.scss';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      USDT_ETH: this.props.USDT_ETH,
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      USDT_ETH: nextProps.USDT_ETH,
    });
  }

  render() {
    const { USDT_ETH, processing } = this.props;
    const roundedUsdToEth = Number(USDT_ETH).toFixed(2);
    return (
      <nav className="ui large top fixed menu">
        <Container>
          <Menu.Item onClick={() => redirect('/')} header>{'Simple react app'}</Menu.Item>
          <Menu.Menu position="right">
            <Menu.Item>
              <div className={styles['app-navbar-exchange-rate']}>
                {processing
                  ?
                    <Loader active />
                  :
                    `USD/ETH ${roundedUsdToEth}`
                }
              </div>
            </Menu.Item>
            <Menu.Item>
              <Button onClick={() => redirect('add-deal')} primary>Новая сделка</Button>
            </Menu.Item>
          </Menu.Menu>
        </Container>
      </nav>
    );
  }
}

function mapStateToProps(store) {
  return {
    USDT_ETH: store.ticker.USDT_ETH,
    processing: store.ticker.processing,
  };
}

NavBar.propTypes = {
  USDT_ETH: PropTypes.string.isRequired,
  processing: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(NavBar);
