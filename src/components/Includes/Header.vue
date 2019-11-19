<template>
    <div class="white z-depth-3">
        <div class="container">
            <nav class="z-depth-0">
                <div class="nav-wrapper white">
                    <router-link :to={} @click.native="routeIndex" title="EquipSolution - Página inicial">
                     <ul id="logo" class="logo hidden">
                        <li>E</li>
                        <li class="ghost">q</li>
                        <li class="ghost">u</li>
                        <li class="ghost">i</li>
                        <li class="ghost">p</li>
                        <li>S</li>
                        <li class="ghost">o</li>
                        <li class="ghost">l</li>
                        <li class="ghost">u</li>
                        <li class="ghost">t</li>
                        <li class="ghost">i</li>
                        <li class="ghost">o</li>
                        <li class="ghost">n</li>
                    </ul>
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
        routeIndex () {
            if (localStorage.getItem('tipo') === 'admin')
            {
                this.$router.push({ name: 'Index' })
            }
            if (localStorage.getItem('tipo') === 'cliente')
            {
                this.$router.push({ name: 'Produtos_ver', params: { id: localStorage.getItem('id') } })
            }
        },
        logout () {
            localStorage.removeItem('tipo')
            this.$router.push({ name: 'Login' })
        }
    },
    mounted () {
        document.getElementById("logo").onmouseenter = function(){
            this.className = "logo";
        };
        document.getElementById("logo").onmouseleave = function(){
         this.className = "logo hidden";
        };
    }
}
</script>

<style lang="scss" scoped>
nav ul li a {
    color: #000;
}
</style>
