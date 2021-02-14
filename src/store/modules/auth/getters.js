export default {
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,
    logout(state) {
      state.status = ''
      state.token = ''
    },
}