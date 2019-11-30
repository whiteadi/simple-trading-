import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import styles from './Orders.module.css';
import CreateOrder from './CreateOrder'
import OrderList from './OrderList';
import { BUY, SELL } from './constants';
import { fetchAllOrders } from './api/api'

const Orders = () => {
  const [hasError, setErrors] = useState(false);
  const [sellOrders, setSellOrders] = useState([]);
  const [buyOrders, setBuyOrders] = useState([]);
  const [state, setState] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const ordersJson = await fetchAllOrders();

      if (Array.isArray(ordersJson)) {
        const getSellOrders = _.filter(
          ordersJson,
          order => order.type === SELL
        );
        const getBellOrders = _.filter(ordersJson, order => order.type === BUY);
        const sortedSellOrders = _.sortBy(getSellOrders, 'price');
        setSellOrders(sortedSellOrders);
        const sortedBuyOrders = _.sortBy(getBellOrders, 'price').reverse();
        setBuyOrders(sortedBuyOrders);
      } else {
        setErrors(ordersJson);
      }
    };
    fetchData();
  }, [state]);

  const forceUpdate = () => {
    console.log(111, 'trying to force rerender');
    setState({});
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>Trading BTC in USD</header>
      <article className={styles.main}>
        <span>
          <CreateOrder orderType={BUY} orderCreated={forceUpdate} />
        </span>
        <span>
          <CreateOrder orderType={SELL} orderCreated={forceUpdate} />
        </span>
      </article>
      <aside className={`${styles.aside} ${styles.aside1}`}>
        {buyOrders && <OrderList list={buyOrders} />}
      </aside>
      <aside className={`${styles.aside} ${styles.aside2}`}>
        {sellOrders && <OrderList list={sellOrders} />}
      </aside>
      {hasError && (
        <footer className={styles.footer}>
          Has error: {JSON.stringify(hasError)}
        </footer>
      )}
    </div>
  );
};
export default Orders;
