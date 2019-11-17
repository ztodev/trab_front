import axiosPlugin from '../axiosPlugin'

const path = 'user'

export default {
    listAll () {
        return axiosPlugin.get(`${path}`)
    },
    list (id) {
        return axiosPlugin.get(`${path}` + '/' + id)
    },
    create (datas) {
        return axiosPlugin.post(`${path}`, datas)
    },
    update (id, datas) {
        return axiosPlugin.patch(`${path}` + '/' + id, datas)
    },
    delete (id) {
        return axiosPlugin.delete(`${path}` + '/' + id)
    },
    login (datas) {
        return axiosPlugin.post(`${path}/login`, datas)
    }
}
