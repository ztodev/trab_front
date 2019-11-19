<template>
    <div class="crud-content z-depth-5">
        <h4 style="padding: 0 .2em">Cadastrar equipamento</h4>

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
                        <label for="nome">Nome do equipamento<strong class="red-text">*</strong></label>
                        <span class="helper-text" :data-error="errors.first('nome')"></span>
                    </div>
                    <div class="input-field col s6">
                        <label for="status">Status<strong class="red-text">*</strong></label>
                        <span class="helper-text" :data-error="errors.first('status')"></span>
                        <br>
                        <select v-model="selected">
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
                    <div class="input-field col s6">
                        <input v-model="datas.valor" v-model.lazy="price" v-money="money" id="valor" type="text" class="validate">
                        <label for="valor">Valor<strong class="red-text">*</strong></label>
                    </div>
                </div>
                <div class="row">
                    <div class="col s6">
                        <button class="btn waves-effect indigo darken-4" type="submit" name="action">Cadastrar equipamento</button>
                        <router-link :to="{ name: 'Produtos', params: { id: this.$route.params.id_user } }" tag="button" name="action" class="btn waves-effect grey">Cancelar</router-link>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {VMoney} from 'v-money'
export default {
    name: 'Editar_prod',
    data: () => ({
        datas: {
            fk_id_user: null,
            nome: null,
            n_serie: null,
            ordem_servico: null,
            valor: null,
            status: null
        },
        price: 0.0,
        money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          suffix: ' #',
          precision: 2,
          masked: false /* doesn't work with directive */
        },
        selected: '1',
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
            this.$set(this.datas, 'fk_id_user', this.$route.params.id_user)
            this.$set(this.datas, 'status', this.selected)
            this.$validator.validate().then(result => {
                // Verifica primeiro se os dados são válidos
                if (!result) {
                    // eslint-disable-next-line
                    return M.toast({ classes: 'orange', html: 'Por favor, corrija os campos antes de continuar' })
                }

                this.$repo.get('equipamento').create(this.datas).then((result) => {
                    // Notifica o operador com uma mensagem de sucesso
                    // eslint-disable-next-line
                    M.toast({ classes: 'green', html: 'Equipamento cadastrado com sucesso' })

                    // Redirecionando o operador de volta para a listagem de equipamentos
                    this.$router.push({ name: 'Produtos', params: { id: this.$route.params.id_user } })
                }).catch(err => {
                    // Verifica se é erro de validação
                    if (err.response.status === 422) {
                        // eslint-disable-next-line
                        return M.toast({ classes: 'orange', html: err.response.data.data.errors.email })
                    }

                    // Informa o operador caso haja algum erro na requisição
                    // eslint-disable-next-line
                    return M.toast({ classes: 'red', html: 'Ops, ocorreu um erro' })
                })
            })
        },
        loginCheck () {
            // eslint-disable-next-line
            if (localStorage.getItem('tipo') === 'cliente')
            {
                this.$router.push({ name: 'Login' })
            } 
        }
    },
    mounted () {
        // Valida o usuário por tipo
        this.loginCheck()
    },
    directives: {money: VMoney}
}
</script>

<style lang="scss">
@import "../assets/scss/styles";
</style>
