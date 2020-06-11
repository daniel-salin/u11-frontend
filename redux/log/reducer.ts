const reducer = (state = {}, action: any): any => {
  switch (action.type) {
    case 'HYDRATE':
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    case 'ADD_LOGS':
      return { ...state, logs: action.payload };
    default:
      return state;
  }
};

export default reducer;
