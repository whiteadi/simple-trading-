import React from 'react';
import PropTypes from 'prop-types';
import './OrderList.css';

const OrderList = ({ list }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Price</th>
          <th>Amount</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        {list.map(item => (
          <tr key={item.id}>
            <td>{item.price}</td>
            <td>{item.amount}</td>
            <td>{item.total}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

OrderList.propTypes = {
  list: PropTypes.array
};

export default OrderList;
