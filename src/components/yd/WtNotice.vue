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
                this.$dialog.notify({
                    mes: this.notice.title + '：' + this.notice.message,
                    timeout: this.notice.duration,
                    callback: this.notice.onClose,
                });
            }
        }
    }
</script>

<style scoped>

</style>