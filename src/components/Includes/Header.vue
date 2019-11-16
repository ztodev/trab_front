<template>
    <div class="white z-depth-3">
        <div class="container">
            <nav class="z-depth-0">
                <div class="nav-wrapper white">
                    <router-link :to="{ name: 'Index' }" title="Listagem de todos os usuários">
                     <small class="brand-logo center black-text">EquipSolution</small>
                    </router-link>
                    <ul id="nav-mobile" class="right hide-on-med-and-down">
                        <li><router-link :to="{ name: 'Index' }" title="Listagem de todos os usuários">Página inicial</router-link></li>
                    </ul>
                </div>
            </nav>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header'
}
</script>

<style lang="scss" scoped>
nav ul li a {
    color: #000;
}
</style>
