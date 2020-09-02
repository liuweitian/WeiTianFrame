<template>
    <div class="empty-text">
        <span v-if="list.length">
            # 403 未授权访问
        </span>
        <span v-else>
            加载中...
        </span>
    </div>
</template>

<script>
    export default {
        name: "notAllow",
        computed: {
            list() {
                return this.$store.state.permission;
            }
        }
    }
</script>

<style scoped>

</style>
