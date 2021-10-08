<template>
    <div id="app">
        <router-view></router-view>      
    </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
    name: 'App',
    components: {
        HelloWorld
    },
    created(){
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
        this.$http.defaults.headers.common.Authorization =token;
    },
}
</script>

<style lang="scss">
@import "./assets/all";
// #app {
//   font-family: 'Avenir', Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
</style>
