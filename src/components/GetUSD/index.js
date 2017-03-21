import React, { PropTypes } from 'react';
import { connect } from 'react-redux';

const GetUSD = ({ number, USDT_ETH }) => {
  const usd = (number * USDT_ETH).toFixed(2).toString();
  return (
    <span>
      ( {`$${usd}`} )
    </span>
  );
};


function mapStateToProps(store) {
  return {
    USDT_ETH: store.ticker.USDT_ETH,
  };
}

GetUSD.propTypes = {
  number: PropTypes.string.isRequired,
  USDT_ETH: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(GetUSD);
