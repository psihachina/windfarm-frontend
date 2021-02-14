import axios from "axios"

export default {
    getWindfarms({ commit }) {
        return new Promise((resolve, reject) => {
            commit("windfarms_request")
            axios({
                url: 'http://localhost:3000/api/windfarms/', method: "GET",
                headers: { 'Authorization': 'Bearer ' + this.state.auth.token }
            })
                .then(resp => {
                    console.log(resp.data);
                    const windfarms = resp.data
                    commit('get_windfarms_success', windfarms)
                    resolve(resp)
                })
                .catch(err => {
                    commit('windfarms_error', err)
                    reject(err)
                })
        })
    },
    addWindfarm({ commit }) {
        return new Promise((resolve, reject) => {
            commit("windfarms_request")
            let wf = this.state.windfarm.windfarm
            console.log(wf);
            axios({
                url: `http://localhost:3000/api/windfarms/`, data: wf, method: "POST",
                headers: { 'Authorization': 'Bearer ' + this.state.auth.token }
            })
                .then(resp => {
                    commit('windfarms_success')
                    resolve(resp)
                })
                .catch(err => {
                    commit('windfarms_error', err)
                    reject(err)
                })
        })
    },
    deleteWindfarm({commit}, id) {
        return new Promise((resolve, reject) => {
            commit("windfarms_request")
            axios({
                url: `http://localhost:3000/api/windfarms/${id}`, method: "DELETE",
                headers: { 'Authorization': 'Bearer ' + this.state.auth.token }
            })
                .then(resp => {
                    commit('windfarms_success')
                    resolve(resp)
                })
                .catch(err => {
                    commit('windfarms_error', err)
                    reject(err)
                })
        })
    },
    setMapData({ commit }, windfarm) {
        commit('set_map_data', windfarm)
    },
    setDetail({ commit }, windfarm) {
        commit('set_detail', windfarm)
    }
}