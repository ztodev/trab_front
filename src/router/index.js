import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Editar from '@/components/Editar'
import Criar from '@/components/Criar'
import Produtos from '@/components/Produtos'
import EditarProd from '@/components/Editar_prod'
import CriarProd from '@/components/Criar_prod'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index
        },
        {
            path: '/criar',
            name: 'Criar',
            component: Criar
        },
        {
            path: '/editar/:id',
            name: 'Editar',
            component: Editar
        },
        {
            path: '/produtos/:id',
            name: 'Produtos',
            component: Produtos
        },
        {
            path: '/criar_prod/:id_user',
            name: 'Criar_prod',
            component: CriarProd
        },
        {
            path: '/editar_prod/:id_user/:id',
            name: 'Editar_prod',
            component: EditarProd
        }
    ]
})
