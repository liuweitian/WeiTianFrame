<template>
    <i :class="className" :style="style"></i>
</template>

<script>
    export default {
        name: "WtIcon",
        props: {
            style: {
                type: Object,
                default: () => {
                    return {};
                }
            }
        },
        computed: {
            className() {
                return 'wt-icon ' + this.name;
            },

            style() {
                return Object.assign({
                    fontSize: 'inherit',
                    color: 'inherit'
                }, this.style);
            }
        }
    }
</script>

<style scoped>

</style>