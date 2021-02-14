import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = {
    status: "",
    token: localStorage.getItem('token') || '',
    user: {},
};

export default {
    state,
    mutations,
    getters,
    actions
};