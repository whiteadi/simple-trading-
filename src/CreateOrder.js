import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import useForm from 'react-hook-form';
import { matchOrder } from './api/api';
import './styles.css';

const CreateOrder = ({ orderType, orderCreated }) => {
  const { handleSubmit, register, errors, reset } = useForm({
    mode: 'onChange'
  });
  const [price, setPrice] = useState(0);
  const [amount, setAmount] = useState(0);
  const [total, setTotal] = useState(0);
  const onSubmit = values => {
      matchOrder({ ...values, total: total, orderType: orderType });
      orderCreated();
      reset();
  };

  useEffect(() => {
    // eslint-disable-next-line
    if (
      !isNaN(price) &&
      amount == parseInt(amount, 10) &&
      Math.sign(amount) === 1
    )
      setTotal(price * amount);
  }, [price, amount]);

  return (
    <>
      <h2>{orderType} BTC</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="price">Price</label>
          <input
            name="price"
            placeholder="USDT"
            ref={register({
              validate: value => !isNaN(value) || 'Price must be a number!'
            })}
            onChange={e => setPrice(e.target.value)}
          />
          {errors.price && errors.price.message}
        </div>

        <div>
          <label htmlFor="amount">Amount</label>
          <input
            name="amount"
            placeholder="BTC"
            ref={register({
              validate: value =>
                (value == parseInt(value, 10) && Math.sign(value) === 1) ||
                'Amount must be a positive number!'
            })}
            onChange={e => setAmount(e.target.value)}
          />
          {errors.amount && errors.amount.message}
        </div>

        <div>
          <label htmlFor="total">Total</label>
          <input name="total" placeholder="USDT" value={total} disabled />
        </div>

        <input type="submit" />
      </form>
    </>
  );
};

CreateOrder.propTypes = {
  orderType: PropTypes.string.isRequired,
  orderCreated: PropTypes.func
};

export default CreateOrder;
