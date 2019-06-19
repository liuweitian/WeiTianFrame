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
        data() {
            return {
                color: {
                    info: '#333333',
                    success: '#04be02',
                    warning: '#ffb400',
                    error: '#ef4f4f'
                }
            };
        },
        watch: {
            messageBoxId() {
                let opts = [];

                if( this.messageBox.showCancelButton ) {
                    opts.push({
                        txt: this.messageBox.cancelButtonText,
                        callback: () => {
                            this.messageBox.callback('cancel');
                        }
                    });
                }

                if( this.messageBox.showConfirmButton ) {
                    opts.push({
                        txt: this.messageBox.confirmButtonText,
                        callback: () => {
                            this.messageBox.callback('confirm');
                        },
                        color: this.color[ this.messageBox.type ],
                    });
                }

                this.$dialog.confirm({
                    title: this.messageBox.title,
                    mes: this.messageBox.message,
                    opts: opts
                });
            }
        }
    }
</script>

<style scoped>

</style>