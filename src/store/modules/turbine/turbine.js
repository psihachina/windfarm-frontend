import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = {
    status : "",
    error: "",
    turbines : {}
}

export default {
    state,
    mutations,
    getters,
    actions
};