import axios from "axios"

export default {
    getTurbines({ commit }) {
        return new Promise((resolve, reject) => {
            commit("turbines_request")
            axios({
                url: 'http://localhost:3000/api/turbines/', method: "GET",
                headers: { 'Authorization': 'Bearer ' + this.state.auth.token }
            })
                .then(resp => {
                    const turbines = resp.data
                    commit('get_turbines_success', turbines)
                    resolve(resp)
                })
                .catch(err => {
                    commit('turbines_error', err)
                    reject(err)
                })
        })
    },
    addTurbine({ commit }, turbine) {
        return new Promise((resolve, reject) => {
            commit("turbines_request")
            console.log(turbine);
            axios({
                url: `http://localhost:3000/api/turbines/`,
                data: {
                    turbine_name: turbine.turbine_name,
                    maximum_power: Number(turbine.maximum_power),
                    max_wind_speed: Number(turbine.max_wind_speed),
                    min_wind_speed: Number(turbine.min_wind_speed),
                    tower_height: Number(turbine.tower_height),
                    number_blades: Number(turbine.number_blades),
                    rotor_diameter: Number(turbine.rotor_diameter),
                    annual_turbine_maintenance: Number(turbine.annual_turbine_maintenance),
                    outputs: [
                        { production: Number(turbine.outputs[0].production) },
                        { production: Number(turbine.outputs[1].production) },
                        { production: Number(turbine.outputs[2].production) },
                        { production: Number(turbine.outputs[3].production) },
                        { production: Number(turbine.outputs[4].production) },
                        { production: Number(turbine.outputs[5].production) },
                        { production: Number(turbine.outputs[6].production) },
                        { production: Number(turbine.outputs[7].production) },
                        { production: Number(turbine.outputs[8].production) },
                        { production: Number(turbine.outputs[9].production) },
                        { production: Number(turbine.outputs[10].production) },
                        { production: Number(turbine.outputs[11].production) },
                        { production: Number(turbine.outputs[12].production) },
                        { production: Number(turbine.outputs[13].production) },
                        { production: Number(turbine.outputs[14].production) }
                    ],
                }
                , method: "POST",
                headers: { 'Authorization': 'Bearer ' + this.state.auth.token }
            })
                .then(resp => {
                    console.log(this.state.turbine.status);
                    commit('turbines_success')
                    resolve(resp)
                })
                .catch(err => {
                    commit('turbines_error', err)
                    reject(err)
                })
        })
    },
    deleteTurbine({ commit }, id) {
        return new Promise((resolve, reject) => {
            commit("turbines_request")
            axios({
                url: `http://localhost:3000/api/turbines/${id}`, method: "DELETE",
                headers: { 'Authorization': 'Bearer ' + this.state.auth.token }
            })
                .then(resp => {
                    commit('turbines_success')
                    resolve(resp)
                })
                .catch(err => {
                    commit('turbines_error', err)
                    reject(err)
                })
        })
    }
}