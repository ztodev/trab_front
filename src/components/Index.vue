<template>
    <div class="rdias-content z-depth-5">
        <h4 class="left">Usuários cadastrados</h4>
        <router-link :to="{ name: 'Criar' }" class="waves-effect indigo darken-4 btn btn-small right">Cadastrar usuário</router-link>

        <div class="clearfix"></div>

        <div v-if="!usuarios.length" class="white-text card-panel indigo darken-4">Nenhum usuário cadastrado por enquanto...</div>

        <table v-else class="responsive-table">
            <thead>
                <tr>
                    <th>CPF</th>
                    <th>Nome</th>
                    <th>Telefone</th>
                    <th>E-mail</th>
                    <th>Endereço</th>
                    <th>Ação</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="usuario in usuarios" :key="usuario.id">
                    <td>{{ usuario.CPF }}</td>
                    <td>{{ usuario.nome }}</td>
                    <td>{{ usuario.telefone }}</td>
                    <td>{{ usuario.email }}</td>
                    <td>{{ usuario.endereco }}</td>
                    <td>
                        <router-link :to="{ name: 'Editar', params: { id: usuario.id } }" :title="'Editar dados de ' + usuario.nome" class="waves-effect indigo darken-4 btn btn-small">Editar</router-link>
                        <router-link :to="{ name: 'Produtos', params: { id: usuario.id } }" :title="'Ver equipamentos do ' + usuario.nome" class="waves-effect green light-4 btn btn-small">Equipamentos</router-link>
                        <a v-on:click.prevent="onDelete(usuario)" :title="'Deletar o usuário '  + usuario.nome" href="#" class="waves-effect btn btn-small red">Deletar</a>
                    </td>
                </tr>
            </tbody>
        </table>

        <!-- Vue JS Modal - Dialog -->
        <v-dialog/>
    </div>
</template>

<script>
export default {
    name: 'Index',
    data: () => ({
        usuarios: []
    }),
    methods: {
        onDelete (usuario) {
            this.$modal.show('dialog', {
                title: 'Deletar usuário ' + usuario.nome,
                text: 'Você tem certeza que deseja continuar?',
                buttons: [
                    {
                        title: 'Sim, deletar usuário',
                        handler: () => {
                            this.$repo.get('usuario').delete(usuario.id).then(response => {
                                // Usuário deletado com sucuesso
                                if (response.data.data.success) {
                                    // Notificação informando que ocorreu tudo ok!
                                    // eslint-disable-next-line
                                    M.toast({ classes: 'green', html: 'Você deletou o usuário ' + usuario.nome + ' com sucesso' })

                                    // Remove o usuário da lista de usuários
                                    this.usuarios.splice(this.usuarios.indexOf(usuario), 1)

                                    // Fechando a dialog
                                    this.$modal.hide('dialog')
                                }
                            })
                        }
                    },
                    {
                        title: 'Cancelar'
                    }
                ]
            })
        },
        loginCheck () {
            localStorage.getItem('tipo') === 'admin' ? '' : this.$router.push({ name: 'Login' })
        }
    },
    mounted () {
        // Validando o tipo de usuário
        this.loginCheck()
        // Obtendo todos os usuários cadastrados no sistema
        this.$repo.get('usuario').listAll().then(results => {
            this.usuarios = results.data.data
        })
    }
}
</script>

<style lang="scss">
@import "../assets/scss/RDiasTeste";
</style>
