<template>
    <div class="white z-depth-3">
        <div class="container">
            <nav class="z-depth-0">
                <div class="nav-wrapper white">
                    <router-link :to="{ name: 'Index' }" title="EquipSolution - Página inicial">
                     <small class="brand-logo center black-text">EquipSolution</small>
                    </router-link>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li><router-link v-on:click.native="logout" to="/" title="Sair">Sair</router-link></li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    methods: {
        logout () {
            localStorage.removeItem('tipo')
            this.$router.push({ name: 'Login' })
        }
    }
}
</script>

<style lang="scss" scoped>
nav ul li a {
    color: #000;
}
</style>
