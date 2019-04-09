<template>
    <div class="wtf-frame">
        {{this.text}}
    </div>
</template>

<script>
    export default {
        name: "WtTip",
        computed: {
            tip() {
                return this.$store.state.tip;
            },
            text() {
                return this.$store.state.tip.text;
            }
        },
        data() {
            return {
                timeoutFlag: undefined,
            };
        },
        watch: {
            text() {
                if( !this.tip.text ) {
                    clearTimeout( this.timeoutFlag );
                } else {
                    setTimeout(() => {
                        this.$store.commit('update', { target: this.tip, data: { text: '' } })
                    }, this.tip.duration);
                }
            },
        }
    }
</script>

<style scoped>

</style>