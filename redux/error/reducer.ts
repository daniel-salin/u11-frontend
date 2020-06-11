const reducer = (state = { message: '', error: false }, action: any): any => {
  switch (action.type) {
    case 'HYDRATE':
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    case 'ERROR':
      return { ...state, message: action.payload, error: true };
    case 'CLEAR_ERROR':
      return { ...state, message: '', error: false };
    default:
      return state;
  }
};

export default reducer;
