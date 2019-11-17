<template>
  <form v-on:submit.prevent="onSubmit" class="center-align">
    <div>
      <div class="rdias-content z-depth-5">
        <div class="padding: 0 .2em">
          Login
        </div>
        <div class="row">
          <div class="input-field col s6 push-s3">
            <input
              required
              type="email"
              v-model="datas.email"
              class="form-control"
              placeholder="E-mail"
            >
          </div>
        </div>
        <div class="row">
          <div class="input-field col s6 push-s3">
            <input
              required
              type="password"
              placeholder="Senha"
              class="form-control"
              v-model="datas.password"
            >
          </div>
        </div>
          <button name="action" type="submit" class="btn waves-effect light-blue darken-4">
            Entrar
          </button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
    name: 'Login',
    data: () => ({
        datas: {
            email: null,
            password: null
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
                this.$repo.get('usuario').login(this.datas).then((result) => {
                    let dados = result.data.data
                    if (dados.length > 0) {
                      // Exibindo a notificação usando o Materialize
                      // eslint-disable-next-line
                      M.toast({ classes: 'green', html: dados[0].nome + ' logado com sucesso' })

                      localStorage.setItem('tipo', dados[0].tipo)

                      // Redirecionando o operador
                      dados[0].tipo === 'cliente' ? this.$router.push({ name: 'Produtos_ver', params: { id: dados[0].id } }) : this.$router.push({ name: 'Index' })
                    }                    
                }).catch(() => {
                    // Informa o operador caso haja algum erro na requisição
                    // eslint-disable-next-line
                    return M.toast({ classes: 'red', html: 'Ops, ocorreu um erro' })
                })
            })
        }
    }
}
</script>

<style lang="scss">
@import "../assets/scss/RDiasTeste";
</style>
