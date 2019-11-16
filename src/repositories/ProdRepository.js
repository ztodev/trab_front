import axiosPlugin from '../axiosPlugin'

const path = 'prod'

export default {
    listAll () {
        return axiosPlugin.get(`${path}`)
    },
    list (id) {
        return axiosPlugin.get(`${path}` + '/user/' + id)
    },
    listID (id) {
        return axiosPlugin.get(`${path}` + '/update/' + id)
    },
    create (datas) {
        return axiosPlugin.post(`${path}`, datas)
    },
    update (id, datas) {
        return axiosPlugin.patch(`${path}` + '/' + id, datas)
    },
    delete (id) {
        return axiosPlugin.delete(`${path}` + '/' + id)
    }
}
