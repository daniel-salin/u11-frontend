const reducer = (state: State = { message: '', error: false }, action: AnyAction) => {
  switch (action.type) {
    case 'HYDRATE':
      // Attention! This will overwrite client state! Real apps should use proper reconciliation.
      return { ...state, ...action.payload };
    case 'ERROR':
      return { ...state, message: action.payload, error: true };
    default:
      return state;
  }
};

export default reducer;
