<template>
    <div class="site-index" @click="click">
        首页
    </div>
</template>

<script>
    export default {
        name: "index",
        methods: {
            click() {
                this.$store.state.user.login();
            }
        },
        mounted() {
        }
    }
</script>

<style scoped>
</style>