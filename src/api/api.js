import _ from 'lodash';
import { API_URL, BUY, SELL } from './../constants';
import { ID } from './../utils';

export const fetchAllOrders = async () => {
  const res = await fetch(API_URL);
  return res
    .json()
    .then(res => res)
    .catch(err => err);
};

export const matchOrder = async ({ orderType, price, amount, total }) => {
    const matchType = orderType === BUY ? SELL : BUY;
    const existingOrders = await fetchAllOrders();
    const ordersToMatchAgainst = _.filter(existingOrders, order => order.type === matchType);
    const foundMatchingOrder = _.find(ordersToMatchAgainst, (order) => {
        return order.price === price && order.amount === amount;
    });

    if (foundMatchingOrder) {
        // delete the matched 1
        deleteOrder(foundMatchingOrder.id);
    } else {
        // create new (unmatched) order
        createOrder({ orderType, price, amount, total });
    }
}

export const createOrder = async ({ orderType, price, amount, total }) => {
  const res = await fetch(API_URL, {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    method: 'POST',
    body: JSON.stringify({
      id: ID(),
      type: orderType,
      price,
      amount,
      total
    })
  });
  res
    .json()
    .then(res => res)
    .catch(err => err);
};

export const deleteOrder = async (orderId) => {
    fetch(`${API_URL}/${orderId}`, {
      method: 'DELETE'
    });
}
