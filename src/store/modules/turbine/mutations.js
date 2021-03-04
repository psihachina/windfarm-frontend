export default {
    get_turbines_success(state, turbines) {
        state.turbines = turbines
        state.status = 'success'
    },
    turbines_success(state) {
        state.status = 'success'
    },
    turbines_request(state) {
        state.status = 'loading'
    },
    turbines_error(state, err) {
        state.status = 'error'
        state.error = err
    }
}