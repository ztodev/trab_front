import Bus from './bus'
import axios from 'axios'

const http = axios.create({
    baseURL: (window.location.hostname !== 'localhost' ? 'http://127.0.0.1:8000/api' : 'http://127.0.0.1:8000/api')
})

/**
 * Configurando os in'terceptors do Axios
 * Assim sabemos quando as requisições do site iniciaram, se falharam
 * E se temos resposta dela, tornando possível informar o resto da aplicação sobre o acontecido.
 * --------
 * Útil no caso para o uso de loadings.
 */
var pRequests = 0

http.interceptors.request.use((config) => {
    pRequests++

    Bus.$events.$emit('isFetching', true)

    return config
}, (err) => {
    pRequests--

    Bus.$events.$emit('isFetching', false)

    return Promise.reject(err)
})

http.interceptors.response.use((response) => {
    pRequests--
    //
    if (pRequests === 0) {
        Bus.$events.$emit('isFetching', false)
    }

    return response
}, (err) => {
    pRequests--
    //
    Bus.$events.$emit('isFetching', false)

    return Promise.reject(err)
})

export default http
