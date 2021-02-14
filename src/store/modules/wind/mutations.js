export default {
    winds_success_add(state) {
        state.status = "success"
    },
    winds_success_get(state, winds) {
        state.status = "success"
        state.winds = winds
    },
    winds_error(state, err) {
        state.status = "error"
        state.error = err
    },
    winds_request(state) {
        state.status = "loading"
    },
    set_winds_data(state, winds) {
        state.winds = winds
    }
}