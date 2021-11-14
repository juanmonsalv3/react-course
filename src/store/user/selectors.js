export const selectAuthToken = (state) => state.user.token;
export const selectIsAuthenticated = (state) => state.user.isAuth;
export const selectUser = (state) => state.user;
export const selectAuthErrors = (state) => state.user.authErrors;
