import { GET_ORDERS } from '../actionTypes';

const initialState = {
  orders: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ORDERS:
      return { ...state, orders: action.data };

    default:
      return state;
  }
};

export default reducer;
