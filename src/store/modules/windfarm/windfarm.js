import actions from './actions';
import mutations from './mutations';
import getters from './getters';

const state = {
    error: null,
    status: "",
    windfarms: {},
    windfarm: {
        polygon: [],
        windfarmLatitude: 0,
        windfarmLongitude: 0,
        cityLatitude: 0,
        cityLongitude: 0,
        rangeToCity: 0,
        rangeToRoad: 0,
        rangeToCityLine: 0,
        windfarmName: "",
        windfarmCapacity: 0,
        windfarmDescription: "",
    }
};

export default {
    state,
    mutations,
    getters,
    actions
};