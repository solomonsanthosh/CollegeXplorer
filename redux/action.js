export const LOGIN = 'LOGIN';

export const loginRedux = userData => ({
  type: LOGIN,
  payload: userData,
});
