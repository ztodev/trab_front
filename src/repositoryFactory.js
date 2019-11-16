import UserRepository from './repositories/UserRepository'
import ProdRepository from './repositories/ProdRepository'

const repositories = {
    usuario: UserRepository,
    equipamento: ProdRepository
}

export default {
    get: name => repositories[name]
}
