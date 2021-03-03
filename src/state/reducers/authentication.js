import { AUTH } from '../actionTypes';

const initialState = {
  authenticated: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH:
      return { ...state, authenticated: action.isUserLoggedIn };

    default:
      return state;
  }
};

export default reducer;
