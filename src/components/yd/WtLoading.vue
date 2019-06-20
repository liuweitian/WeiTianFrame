<template>
    <span></span>
</template>

<script>
    export default {
        name: "WtLoading",
        computed: {
            loadingShow() {
                return this.$store.state.loading.show;
            },
            loadingText() {
                return this.$store.state.loading.text;
            },
            loadingRun() {
                return this.$store.state.loading.run;
            },
        },
        methods: {
            close() {
                this.$dialog.loading.close();
                this.$store.dispatch('hideLoading');
            }
        },
        watch: {
            loadingShow(show) {
                if( show ) {
                    this.$dialog.loading.open(this.loadingText);
                    this.$nextTick(() => {
                        typeof this.loadingRun === 'function' ? this.loadingRun(this.close) : '';
                    });
                }
            }
        }
    }
</script>

<style scoped>

</style>