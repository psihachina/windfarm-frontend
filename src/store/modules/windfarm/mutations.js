export default {
    get_windfarms_success(state, windfarms) {
        state.windfarms = windfarms
        state.status = 'success'
    },
    windfarms_success(state) {
        state.status = 'success'
    },
    windfarms_request(state) {
        state.status = 'loading'
    },
    windfarms_error(state, err) {
        state.status = 'error'
        state.error = err
    },
    set_map_data(state, windfarm) {
        state.windfarm = windfarm
    },
    set_detail(state, windfarm) {
        console.log(windfarm);
        state.windfarm.windfarmName = windfarm.windfarmName;
        state.windfarm.windfarmCapacity = parseInt(windfarm.windfarmCapacity);
        state.windfarm.windfarmDescription = windfarm.windfarmDescription;
    }
}