<template>
    <div id="app">
        <!-- Loading -->
        <loading :width="80" :height="80" :opacity="0.4" background-color="#000" color="#003674" :active.sync="isLoading" :is-full-page="true"></loading>

        <Header></Header>
        <div class="container">
            <router-view/>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import Bus from './bus'
import Header from './components/includes/Header'
import Login from './components/Login'

// Loading
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'

export default {
    name: 'App',
    components: { Header, Loading },
    data: () => ({ isLoading: false }),
    mounted () {
        // Determinando se uma requisição está sendo feita no momento para mostrar o loader
        // Como citado em 'axiosPlugin.js.
        Bus.$events.$on('isFetching', bool => this.isLoading = bool)
    }
}
</script>
