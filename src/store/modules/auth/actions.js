import axios from "axios"

export default {
    login({ commit }, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            axios({ url: 'http://localhost:3000/auth/sing-in', data: user, method: 'POST' })
                .then(resp => {
                    const token = resp.data.token
                    localStorage.setItem('token', token)
                    axios.defaults.headers.common['Authorization'] = token
                    commit('auth_success', token)
                    resolve(resp)
                })
                .catch(err => {
                    commit('auth_error')
                    localStorage.removeItem('token')
                    reject(err)
                })
        })
    },
    register({ commit }, user) {
        return new Promise((resolve, reject) => {
            commit('auth_request')
            axios({ url: 'http://localhost:3000/auth/sing-up', data: user, method: 'POST' })
                .then(resp => {
                    const token = resp.data.token
                    localStorage.setItem('token', token)
                    axios.defaults.headers.common['Authorization'] = token
                    commit('auth_success', token)
                    resolve(resp)
                })
                .catch(err => {
                    commit('auth_error', err)
                    localStorage.removeItem('token')
                    reject(err)
                })
        })
    },
    logout({ commit }) {
        return new Promise((resolve) => {
            commit('logout')
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
            this.state.token = ''
            resolve()
        })
    },
}