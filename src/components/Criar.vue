<template>
    <div class="crud-content z-depth-5">
        <h4 style="padding: 0 .2em">Cadastrar usuário</h4>

        <div class="row">
            <form v-on:submit.prevent="onSubmit" class="col s12">
                <div class="row">
                    <div class="input-field col s6">
                        <input
                            v-validate="'required|CPF'"
                            v-mask="['###.###.###-##']"
                            v-model="datas.CPF"
                            name="CPF"
                            :class="{'invalid': errors.has('CPF')}"
                            id="cpf" type="text">
                        <label for="cpf">CPF<strong class="red-text">*</strong></label>
                        <span class="helper-text" :data-error="errors.first('CPF')"></span>
                    </div>
                    <div class="input-field col s6">
                        <input
                            v-validate="{ required: true, regex: /^[a-zA-Z]+(?: +[a-zA-Z]+)+$/i }"
                            v-model="datas.nome"
                            name="nome"
                            :class="{'invalid': errors.has('nome')}"
                            id="nome" type="text">
                        <label for="nome">Nome Completo<strong class="red-text">*</strong></label>
                        <span class="helper-text" :data-error="errors.first('nome')"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <input v-mask="['(##) ####-####', '(##) #####-####']" v-model="datas.telefone" id="ddd_telefone" type="text" class="validate">
                        <label for="ddd_telefone">Telefone</label>
                    </div>
                    <div class="input-field col s6">
                        <input
                            v-validate="'required|email'"
                            v-model="datas.email"
                            data-vv-as="e-mail"
                            name="email"
                            :class="{'invalid': errors.has('email')}"
                            id="email" type="text">
                        <label for="email">E-mail<strong class="red-text">*</strong></label>
                        <span class="helper-text" :data-error="errors.first('email')"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <input v-model="datas.password" id="password" type="password" class="validate">
                        <label for="password">Senha<strong class="red-text">*</strong></label>
                    </div>
                    <div class="input-field col s6">
                        <label for="status">Tipo<strong class="red-text">*</strong></label>
                        <span class="helper-text" :data-error="errors.first('tipo')"></span>
                        <br>
                        <select v-model="selected">
                            <option v-for="option in options" v-bind:key="option.value">
                                {{ option.text }}
                            </option>
                        </select>
                    </div>                    
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input v-model="datas.endereco" id="endereco" type="text" class="validate">
                        <label for="endereco">Endereço</label>
                    </div>
                </div>

                <div class="row">
                    <div class="col s6">
                        <button class="btn waves-effect indigo darken-4" type="submit" name="action">Cadastrar usuário</button>
                        <router-link :to="{ name: 'Index' }" tag="button" name="action" class="btn waves-effect grey">Cancelar</router-link>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Editar',
    data: () => ({
        datas: {
            CPF: null,
            nome: null,
            telefone: null,
            email: null,
            tipo: null,
            password: null,
            endereco: null
        },
        selected: 'Cliente',
        options: [
            {text: 'Admin', value: 'Admin'},
            {text: 'Cliente', value: 'Cliente'}
        ]
    }),
    methods: {
        onSubmit () {
            this.$set(this.datas, 'tipo', this.selected.toLowerCase())
            this.$validator.validate().then(result => {
                // Verifica primeiro se os dados são válidos
                if (!result) {
                    // eslint-disable-next-line
                    return M.toast({ classes: 'orange', html: 'Por favor, corrija os campos antes de continuar' })
                }

                this.$repo.get('usuario').create(this.datas).then((result) => {
                    // Notifica o operador com uma mensagem de sucesso
                    // eslint-disable-next-line
                    M.toast({ classes: 'green', html: 'Usuário cadastrado com sucesso' })

                    // Redirecionando o operador de volta para a listagem de usuários
                    this.$router.push({ name: 'Index' })
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
            localStorage.getItem('tipo') === 'admin' ? '' : this.$router.push({ name: 'Login' })
        }
    },
    mounted () {
        // Validando o tipo de usuário
        this.loginCheck()
    }
}
</script>

<style lang="scss">
@import "../assets/scss/styles";
</style>
