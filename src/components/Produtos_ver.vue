<template>
    <div class="crud-content z-depth-5">
        <h4 class="left">Equipamentos cadastrados</h4>
        <router-link :to="{ name: 'Cliente_criar', params: { id_user: this.$route.params.id } }" class="waves-effect indigo darken-4 btn btn-small right">Cadastrar equipamento</router-link>

        <div class="clearfix"></div>

        <div v-if="!equipamentos.length" class="white-text card-panel indigo darken-4">Nenhum equipamento cadastrado por enquanto...</div>

        <table v-else class="responsive-table">
            <thead>
                <tr>
                    <th>Equipamento</th>
                    <th>N° Serie</th>
                    <th>Ordem de Serviço</th>
                    <th>Valor</th>
                    <th>Status</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="equipamento in equipamentos" :key="equipamento.id">
                    <td>{{ equipamento.nome }}</td>
                    <td>{{ equipamento.n_serie }}</td>
                    <td>{{ equipamento.ordem_servico }}</td>
                    <td>R${{ formatPrice(equipamento.valor) }}</td>
                    <td>{{ equipamento.status }}</td>
                </tr>
            </tbody>
        </table>

        <!-- Vue JS Modal - Dialog -->
        <v-dialog/>
    </div>
</template>

<script>
export default {
    name: 'Produtos_ver',
    data: () => ({
        equipamentos: []
    }),
    methods: {
        onDelete (equipamento) {
            this.$modal.show('dialog', {
                title: 'Deletar equipamento ' + equipamento.nome,
                text: 'Você tem certeza que deseja continuar?',
                buttons: [
                    {
                        title: 'Sim, deletar equipamento',
                        handler: () => {
                            this.$repo.get('equipamento').delete(equipamento.id).then(response => {
                                // Usuário deletado com sucuesso
                                if (response.data.data.success) {
                                    // Notificação informando que ocorreu tudo ok!
                                    // eslint-disable-next-line
                                    M.toast({ classes: 'green', html: 'Você deletou o equipamento ' + equipamento.nome + ' com sucesso' })

                                    // Remove o usuário da lista de usuários
                                    this.equipamentos.splice(this.equipamentos.indexOf(equipamento), 1)

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
        formatPrice(value) {
            let val = (value/1).toFixed(2).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
        loginCheck () {
            // eslint-disable-next-line
           if (localStorage.getItem('tipo') === 'admin')
           {
               this.$router.push({ name: 'Login' })
           }
        }
    },
    mounted () {
        // Valida o usuário por tipo
        this.loginCheck()
        // Obtendo todos os equipamentos do usuário
        this.$repo.get('equipamento').list(this.$route.params.id).then(results => {
            this.equipamentos = results.data.data
        })
    }
}
</script>

<style lang="scss">
@import "../assets/scss/styles";
</style>
