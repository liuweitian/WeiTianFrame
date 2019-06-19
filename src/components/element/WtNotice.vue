<template>
    <small></small>
</template>

<script>
    export default {
        name: "WtNotice",
        computed: {
            notice() {
                return this.$store.state.notice;
            },
            noticeId() {
                return this.$store.state.notice.id;
            },
        },
        watch: {
            noticeId() {
                this.$notify( Object.assign({}, this.notice) );
            }
        }
    }
</script>

<style scoped>

</style>