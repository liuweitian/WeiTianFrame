<template>
    <small></small>
</template>

<script>
    export default {
        name: "WtMessageBox",
        computed: {
            messageBox() {
                return this.$store.state.messageBox;
            },
            messageBoxId() {
                return this.$store.state.messageBox.id;
            },
        },
        watch: {
            messageBoxId() {
                this.$confirm(this.messageBox.message, this.messageBox.title, Object.assign({}, this.messageBox));
            }
        }
    }
</script>

<style scoped>

</style>