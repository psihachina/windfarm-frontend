import axios from "axios"

export default {
    addWinds({ commit }, windfarm_id) {
        return new Promise((resolve, reject) => {
            commit("winds_request")
            console.log(this.state.wind.status);
            axios({
                url: `http://localhost:3000/api/windfarms/${windfarm_id}/winds/`,
                timeout: 60000,
                method: "POST",
                headers: { 'Authorization': 'Bearer ' + this.state.auth.token }
            })
                .then(resp => {
                    commit('winds_success_add')
                    resolve(resp)
                })
                .catch(err => {
                    commit('winds_error', err)
                    reject(err)
                })
        })
    },
    getWinds({ commit }, windfarm_id) {
        return new Promise((resolve, reject) => {
            commit("winds_request")
            axios({
                url: `http://localhost:3000/api/windfarms/${windfarm_id}/winds/`, method: "GET",
                headers: { 'Authorization': 'Bearer ' + this.state.auth.token }
            })
                .then(resp => {
                    console.log(resp);
                    commit('winds_success_get', resp)
                    resolve(resp)
                })
                .catch(err => {
                    commit('winds_error', err)
                    reject(err)
                })
        })
    },
}