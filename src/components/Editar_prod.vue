<template>
    <div class="crud-content z-depth-5">
        <h4 style="padding: 0 .2em">Editar equipamento</h4>

        <div class="row">
            <form v-on:submit.prevent="onSubmit" class="col s12">
                <div class="row">
                    <div class="input-field col s6">
                        <input
                            v-validate="{ required: true, regex: /^[_A-z0-9]*((-|\s)*[_A-z0-9])*$/i }"
                            v-model="datas.nome"
                            name="nome"
                            :class="{'invalid': errors.has('nome')}"
                            id="nome" type="text">
                        <label for="nome">Nome Completo<strong class="red-text">*</strong></label>
                        <span class="helper-text" :data-error="errors.first('nome')"></span>
                    </div>
                    <div class="input-field col s6">
                        <label for="status">Status<strong class="red-text">*</strong></label>
                        <span class="helper-text" :data-error="errors.first('status')"></span>
                        <br>
                        <select v-model="datas.status">
                            <option v-for="option in options" v-bind:key="option.value">
                                {{ option.text }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <input v-mask="['###.###-##', '###.###-##']" v-model="datas.ordem_servico" id="ordem_servico" type="text" class="validate">
                        <label for="ordem_servico">Ordem de serviço<strong class="red-text">*</strong></label>
                    </div>
                    <div class="input-field col s6">
                        <input  v-model="datas.n_serie" id="n_serie" type="text" class="validate">
                        <label for="n_serie">N° de serie<strong class="red-text">*</strong></label>
                    </div>
                </div>
                <div class="row">
                    <div class="col s6">
                        <button class="btn waves-effect indigo darken-4" type="submit" name="action">Editar equipamento</button>
                        <router-link :to="{ path: this.$router.back() }" tag="button" name="action" class="btn waves-effect grey">Cancelar</router-link>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Editar_prod',
    data: () => ({
        datas: {
            fk_id_user: null,
            nome: null,
            n_serie: null,
            ordem_servico: null,
            status: null
        },
        options: [
            { text: 'Aguardando', value: '1' },
            { text: 'Em análise', value: '2' },
            { text: 'Em reparo', value: '3' },
            { text: 'Enviado', value: '4' },
            { text: 'Entregue', value: '5' }
        ]
    }),
    methods: {
        onSubmit () {
            this.$validator.validate().then(result => {
                if (!result) {
                    // eslint-disable-next-line
                    return M.toast({ classes: 'orange', html: 'Por favor, corrija os campos antes de continuar' })
                }

                // Enviando os novos dados para o servidor
                this.$repo.get('equipamento').update(this.$route.params.id, this.datas).then((result) => {
                    // Exibindo a notificação usando o Materialize
                    // eslint-disable-next-line
                    M.toast({ classes: 'green', html: 'Equipamento ' + result.data.data.nome + ' editado com sucesso' })

                    // Redirecionando o operador de volta para a listagem de usuários
                    // this.$router.push({ name: 'Index' })
                }).catch(() => {
                    // Informa o operador caso haja algum erro na requisição
                    // eslint-disable-next-line
                    return M.toast({ classes: 'red', html: 'Ops, ocorreu um erro' })
                })
            })
        },
        loginCheck () {
            localStorage.getItem('tipo') === 'admin' ? '' : this.$router.push({ name: 'Login' })
        }
    },
    mounted () {
        // Valida o usuário por tipo
        this.loginCheck()

        // Obtendo os dados do usuário
        // Em seguida atribui os dados para as models.
        this.$repo.get('equipamento').listID(this.$route.params.id).then(result => {
            let datas = result.data.data

            this.datas.fk_id_user = datas.fk_id_user
            this.datas.nome = datas.nome
            this.datas.n_serie = datas.n_serie
            this.datas.ordem_servico = datas.ordem_servico
            this.datas.status = datas.status

            // Atualizando os campos através do plugin do Materialize
            // E adicionando a açao na fila de renderização do Vue
            this.$nextTick(() => {
                // eslint-disable-next-line
                M.updateTextFields()
            })
        }).catch(() => {
            // Notifica o operador que o usuário que ele está tentando editar não existe
            // eslint-disable-next-line
            M.toast({ classes: 'orange', html: 'O equipamento que você tentou editar não existe' })
            this.$router.back()
        })
    }
}
</script>

<style lang="scss">
@import "../assets/scss/styles";
</style>
