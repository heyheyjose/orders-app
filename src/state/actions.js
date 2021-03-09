import { GET_ORDERS, AUTH } from './actionTypes';

export function updateAuth(isUserLoggedIn) {
  return { type: AUTH, isUserLoggedIn };
}

const data = [
  {
  "orderNumber": "555887654",
  "orderDate": "2021-02-24T00:00:00",
  "orderStatus": "A",
  "scheduledDateTime": "2021-02-24T09:30:00",
  "deliveredDateTime": null
  },
  {
  "orderNumber": "745638456",
  "orderDate": "2021-02-24T00:00:00",
  "orderStatus": "C",
  "scheduledDateTime": "2021-02-24T11:15:00",
  "deliveredDateTime": "2021-02-24T11:05:00"
  },
  {
  "orderNumber": "123987456",
  "orderDate": "2021-02-24T00:00:00",
  "orderStatus": "C",
  "scheduledDateTime": "2021-02-24T13:45:00",
  "deliveredDateTime": "2021-02-24T14:35:00"
  },
  {
  "orderNumber": "963258741",
  "orderDate": "2021-02-24T00:00:00",
  "orderStatus": "C",
  "scheduledDateTime": "2021-02-24T18:30:00",
  "deliveredDateTime": "2021-02-24T18:30:00"
  }
];

export function fetchOrders() {
  return (dispatch) => {
    // fetch('/api/orders')
    //   .then(res => res.json())
    //   .then(data => dispatch({ type: GET_ORDERS, data }))
    //   .catch(error => console.error(error));
    dispatch({ type: GET_ORDERS, data });
  };
}
