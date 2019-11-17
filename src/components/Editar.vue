<template>
    <div class="crud-content z-depth-5">
        <h4 style="padding: 0 .2em">Editar usuário</h4>

        <div class="row">
            <form v-on:submit.prevent="onSubmit" class="col s12">
                <div class="row">
                    <div class="input-field col s6">
                        <input readonly v-model="datas.CPF" id="cpf" type="text" class="validate">
                        <label class="active" for="cpf">CPF</label>
                    </div>
                    <div class="input-field col s6">
                        <input
                            v-validate="{ required: true, regex: /^[a-zA-Z]+(?: +[a-zA-Z]+)+$/i }"
                            v-model="datas.nome"
                            name="nome"
                            :class="{'invalid': errors.has('nome')}"
                            id="nome" type="text" class="validate">
                        <label class="active" for="nome">Nome Completo<strong class="red-text">*</strong></label>
                        <span class="helper-text" :data-error="errors.first('nome')"></span>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s6">
                        <input v-model="datas.telefone" id="ddd_telefone" type="text" class="validate">
                        <label class="active" for="ddd_telefone">Telefone</label>
                    </div>
                    <div class="input-field col s6">
                        <input readonly v-model="datas.email" id="email" type="email" class="validate">
                        <label class="active" for="email">Email</label>
                    </div>
                </div>
                <div class="row">
                    <div class="input-field col s12">
                        <input v-model="datas.endereco" id="endereco" type="text" class="validate">
                        <label class="active" for="endereco">Endereço</label>
                    </div>
                </div>
                <div class="row">
                    <div class="col s6">
                        <button class="btn waves-effect indigo darken-4" type="submit" name="action">Editar usuário</button>
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
            endereco: null
        }
    }),
    methods: {
        onSubmit () {
            this.$validator.validate().then(result => {
                if (!result) {
                    // eslint-disable-next-line
                    return M.toast({ classes: 'orange', html: 'Por favor, corrija os campos antes de continuar' })
                }

                // Enviando os novos dados para o servidor
                this.$repo.get('usuario').update(this.$route.params.id, this.datas).then((result) => {
                    // Exibindo a notificação usando o Materialize
                    // eslint-disable-next-line
                    M.toast({ classes: 'green', html: 'Usuário ' + result.data.data.nome + ' editado com sucesso' })

                    // Redirecionando o operador de volta para a listagem de usuários
                    this.$router.push({ name: 'Index' })
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
        this.$repo.get('usuario').list(this.$route.params.id).then(result => {
            let datas = result.data.data

            this.datas.CPF = datas.CPF
            this.datas.nome = datas.nome
            this.datas.telefone = datas.telefone
            this.datas.email = datas.email
            this.datas.endereco = datas.endereco

            // Atualizando os campos através do plugin do Materialize
            // E adicionando a açao na fila de renderização do Vue
            this.$nextTick(() => {
                // eslint-disable-next-line
                M.updateTextFields()
            })
        }).catch(() => {
            // Notifica o operador que o usuário que ele está tentando editar não existe
            // eslint-disable-next-line
            M.toast({ classes: 'orange', html: 'O usuário que você tentou editar não existe' })
            this.$router.push({ name: 'Index' })
        })
    }
}
</script>

<style lang="scss">
@import "../assets/scss/styles";
</style>
