const reducer = (state = { loggedIn: false, accessToken: null }, action: any) => {
  switch (action.type) {
    case 'HYDRATE':
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    case 'LOGIN_USER':
      return { ...state, loggedIn: true, accessToken: action.payload };
    case 'LOGOUT_USER':
      return { ...state, loggedIn: false, accessToken: null };
    default:
      return state;
  }
};

export default reducer;
