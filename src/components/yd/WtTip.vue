<template>
    <small></small>
</template>

<script>
    export default {
        name: "WtTip",
        computed: {
            tip() {
                return this.$store.state.tip;
            },
            id() {
                return this.$store.state.tip.id;
            }
        },
        watch: {
            id() {
                this.$dialog.toast({
                    mes: this.tip.text,
                    timeout: this.tip.duration,
                    icon: this.tip.type
                });
            }
        }
    }
</script>

<style scoped>

</style>