import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Index from '@/components/Index'
import Editar from '@/components/Editar'
import Criar from '@/components/Criar'
import Produtos from '@/components/Produtos'
import ProdutosVer from '@/components/Produtos_ver'
import EditarProd from '@/components/Editar_prod'
import CriarProd from '@/components/Criar_prod'
import ClienteProd from '@/components/Cliente_criar'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Login',
            component: Login
        },
        {
            path: '/admin',
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
            path: '/produtos_ver/:id',
            name: 'Produtos_ver',
            component: ProdutosVer
        },
        {
            path: '/criar_prod/:id_user',
            name: 'Criar_prod',
            component: CriarProd
        },
        {
            path: '/editar_prod/:id',
            name: 'Editar_prod',
            component: EditarProd
        },
        {
            path: '/produto_cliente/:id_user',
            name: 'Cliente_criar',
            component: ClienteProd
        },
    ]
})
