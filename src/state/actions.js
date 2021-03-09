import { GET_ORDERS, AUTH } from './actionTypes';

export function updateAuth(isUserLoggedIn) {
  return { type: AUTH, isUserLoggedIn };
}

export function fetchOrders() {
  return (dispatch) => {
    fetch('/api/orders')
      .then(res => res.json())
      .then(data => dispatch({ type: GET_ORDERS, data }))
      .catch(error => console.error(error));
  };
}
