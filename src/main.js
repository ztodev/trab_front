// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axiosPlugin from './axiosPlugin'
import repositoryFactory from './repositoryFactory'
import 'materialize-css/dist/js/materialize.min'
import VModal from 'vue-js-modal'
import VueTheMask from 'vue-the-mask'
import VeeValidate from 'vee-validate'
import VeeValidatePTBR from 'vee-validate/dist/locale/pt_BR'
import CPFValidator from './custom_rules/CPF.validator'

VeeValidate.Validator.localize('pt_BR', VeeValidatePTBR)
VeeValidate.Validator.extend('CPF', CPFValidator)

Vue.use(VModal, { dialog: true })
Vue.use(VueTheMask)
Vue.use(VeeValidate, { locale: 'pt_BR', fieldsBagName: 'formFields' })

Vue.prototype.$http = axiosPlugin
Vue.prototype.$repo = repositoryFactory

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>',
    mounted () {
        document.title = 'EquipSolution'
    }
})
